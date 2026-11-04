'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DEMO_PATRON } from '@/data/auth';
import { api } from '@/services/api';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  memberId: string;
  status: string;
  preferredSalon?: string;
  joinedDate: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  signup: (data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    preferredSalon?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  fillDemoUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'monarch_royal_patron';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Hydrate from localStorage or verify with backend /me on client mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
        if (stored) {
          setUser(JSON.parse(stored));
        }

        // Check backend session asynchronously
        try {
          const res = await api.auth.getMe();
          if (res?.user) {
            setUser(res.user);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(res.user));
          }
        } catch {
          // Backend offline or token expired, keep cached user
        }
      } catch {
        // Ignore storage errors in restricted contexts
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (
    email: string,
    password: string,
    rememberMe: boolean = true
  ): Promise<{ success: boolean; error?: string }> => {
    if (!email || !password) {
      return { success: false, error: 'Please enter both your email address and password.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return { success: false, error: 'Please enter a valid royal patron email address.' };
    }

    // Try backend API first
    try {
      const res = await api.auth.login(email.trim(), password);
      if (res?.user) {
        setUser(res.user);
        if (rememberMe) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(res.user));
        } else {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(res.user));
        }
        return { success: true };
      }
    } catch (apiErr: any) {
      // If backend explicitly rejected invalid credentials, return that error
      if (apiErr.message && !apiErr.message.includes('Failed to fetch') && !apiErr.message.includes('NetworkError')) {
        return { success: false, error: apiErr.message };
      }
      // Otherwise fallback to demo patron if offline
    }

    // Fallback: Check if matching demo user or arbitrary valid credential
    const normalizedEmail = email.trim().toLowerCase();
    let authenticatedUser: AuthUser;

    if (normalizedEmail === DEMO_PATRON.email.toLowerCase()) {
      authenticatedUser = {
        id: 'usr_patron_001',
        name: DEMO_PATRON.name,
        email: DEMO_PATRON.email,
        phone: DEMO_PATRON.phone,
        memberId: DEMO_PATRON.memberId,
        status: DEMO_PATRON.status,
        joinedDate: 'October 2024',
      };
    } else {
      const localName = normalizedEmail.split('@')[0];
      const capitalized = localName.charAt(0).toUpperCase() + localName.slice(1);
      authenticatedUser = {
        id: `usr_${Date.now()}`,
        name: `Patron ${capitalized}`,
        email: normalizedEmail,
        phone: '+91 98000 00000',
        memberId: `MONARCH-VIP-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'Royal Sovereign Patron',
        joinedDate: 'October 2026',
      };
    }

    setUser(authenticatedUser);

    try {
      if (rememberMe) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(authenticatedUser));
      } else {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(authenticatedUser));
      }
    } catch {
      // Ignore
    }

    return { success: true };
  };

  const signup = async (data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    preferredSalon?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    if (!data.name || !data.email || !data.password) {
      return { success: false, error: 'Please complete all required patron registry fields.' };
    }

    if (data.password.length < 6) {
      return { success: false, error: 'Security key must be at least 6 characters in length.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      return { success: false, error: 'Please enter a valid royal patron email address.' };
    }

    // Try backend API first
    try {
      const res = await api.auth.signup({
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        password: data.password,
        phone: data.phone?.trim(),
        preferredSalon: data.preferredSalon,
      });

      if (res?.user) {
        setUser(res.user);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(res.user));
        return { success: true };
      }
    } catch (apiErr: any) {
      if (apiErr.message && !apiErr.message.includes('Failed to fetch') && !apiErr.message.includes('NetworkError')) {
        return { success: false, error: apiErr.message };
      }
    }

    // Fallback if offline
    const newPatron: AuthUser = {
      id: `usr_${Date.now()}`,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      phone: data.phone?.trim() || '+91 98200 00000',
      memberId: `MONARCH-VIP-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Royal Sovereign Patron',
      preferredSalon: data.preferredSalon,
      joinedDate: 'October 2026',
    };

    setUser(newPatron);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPatron));
    } catch {
      // Ignore
    }

    return { success: true };
  };

  const logout = async () => {
    try {
      await api.auth.logout();
    } catch {
      // ignore
    }
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const fillDemoUser = () => {
    const demo: AuthUser = {
      id: 'usr_patron_001',
      name: DEMO_PATRON.name,
      email: DEMO_PATRON.email,
      phone: DEMO_PATRON.phone,
      memberId: DEMO_PATRON.memberId,
      status: DEMO_PATRON.status,
      joinedDate: 'October 2024',
    };
    setUser(demo);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demo));
    } catch {
      // Ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        fillDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
