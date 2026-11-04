/**
 * MONARCH Haute Couture — Production API Client
 * Seamlessly integrates the Next.js frontend with the Express/MongoDB Backend.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('monarch_auth_token');
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    credentials: 'include', // sends cookies (JWT)
  });

  if (!response.ok) {
    let errorMsg = `HTTP Error ${response.status}`;
    try {
      const errorData = await response.json();
      errorMsg = errorData.message || errorData.error || errorMsg;
    } catch {
      // ignore
    }
    throw new Error(errorMsg);
  }

  return response.json();
}

export const api = {
  // Authentication & Patron Profile
  auth: {
    async login(email: string, password: string) {
      const res = await request<{ success: boolean; user: any; token: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      if (typeof window !== 'undefined' && res?.token) {
        localStorage.setItem('monarch_auth_token', res.token);
      }
      return res;
    },
    async signup(data: { name: string; email: string; password: string; phone?: string; preferredSalon?: string }) {
      const res = await request<{ success: boolean; user: any; token: string }>('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (typeof window !== 'undefined' && res?.token) {
        localStorage.setItem('monarch_auth_token', res.token);
      }
      return res;
    },
    async getMe() {
      return request<{ success: boolean; user: any }>('/auth/me');
    },
    async logout() {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('monarch_auth_token');
      }
      return request<{ success: boolean }>('/auth/logout', { method: 'POST' });
    },
  },

  // Products & Collections
  products: {
    async getAll(params?: { category?: string; gender?: string; collection?: string; search?: string; sort?: string }) {
      const searchParams = new URLSearchParams();
      if (params?.category) searchParams.set('category', params.category);
      if (params?.gender) searchParams.set('gender', params.gender);
      if (params?.collection) searchParams.set('collection', params.collection);
      if (params?.search) searchParams.set('search', params.search);
      if (params?.sort) searchParams.set('sort', params.sort);
      const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
      return request<any[]>(`/products${query}`);
    },
    async getByIdOrSlug(idOrSlug: string) {
      return request<any>(`/products/${encodeURIComponent(idOrSlug)}`);
    },
  },

  // Categories & Taxonomy
  categories: {
    async getAll(gender?: string) {
      const query = gender ? `?gender=${encodeURIComponent(gender)}` : '';
      return request<any[]>(`/categories${query}`);
    },
    async getBySlug(slug: string) {
      return request<any>(`/categories/${encodeURIComponent(slug)}`);
    },
  },

  // Collections
  collections: {
    async getAll() {
      return request<any[]>('/collections');
    },
    async getBySlug(slug: string) {
      return request<any>(`/collections/${encodeURIComponent(slug)}`);
    },
  },

  // Cart
  cart: {
    async get() {
      return request<any>('/cart');
    },
    async add(item: { productId: string; name: string; price: number; color?: string; size?: string; count?: number; customMeasurements?: any }) {
      return request<any>('/cart/add', {
        method: 'POST',
        body: JSON.stringify(item),
      });
    },
    async update(productId: string, count: number, color?: string, size?: string) {
      return request<any>('/cart/update', {
        method: 'PUT',
        body: JSON.stringify({ productId, count, color, size }),
      });
    },
    async clear() {
      return request<any>('/cart/clear', { method: 'DELETE' });
    },
  },

  // Orders & Checkout
  orders: {
    async create(orderData: any) {
      return request<any>('/orders', {
        method: 'POST',
        body: JSON.stringify(orderData),
      });
    },
    async getMyOrders() {
      return request<any[]>('/orders');
    },
    async getById(orderId: string) {
      return request<any>(`/orders/${encodeURIComponent(orderId)}`);
    },
  },

  // Coupons
  coupons: {
    async validate(code: string, orderAmount: number) {
      return request<any>('/coupons/validate', {
        method: 'POST',
        body: JSON.stringify({ code, orderAmount }),
      });
    },
  },

  // Newsletter
  newsletter: {
    async subscribe(email: string, fullName?: string, preferredCategories?: string[]) {
      return request<any>('/newsletter/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email, fullName, preferredCategories }),
      });
    },
  },

  // Reviews
  reviews: {
    async getForProduct(productId: string) {
      return request<any[]>(`/reviews?productId=${encodeURIComponent(productId)}`);
    },
    async submit(review: { productId: string; productName?: string; customerName: string; customerEmail?: string; rating: number; title?: string; comment: string }) {
      return request<any>('/reviews', {
        method: 'POST',
        body: JSON.stringify(review),
      });
    },
  },

  // Storefront Section Frames
  frames: {
    async getAll(sectionKey?: string) {
      const query = sectionKey && sectionKey !== 'all' ? `?sectionKey=${encodeURIComponent(sectionKey)}` : '';
      return request<any[]>(`/storefront/frames${query}`);
    },
    async getById(id: string) {
      return request<any>(`/storefront/frames/${encodeURIComponent(id)}`);
    },
  },

  // Razorpay Gateway
  payments: {
    async createRazorpayOrder(amount: number) {
      return request<{ orderId: string; amount: number; currency: string; keyId: string }>('/payments/create-order', {
        method: 'POST',
        body: JSON.stringify({ amount }),
      });
    },
    async verifyPayment(payload: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
      orderDetails: any;
    }) {
      return request<{ message: string; order: any }>('/payments/verify', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },
  },

  // Delhivery Logistics & Tracking
  shipping: {
    async checkPincode(pincode: string) {
      return request<{
        success: boolean;
        code: string;
        message: string;
        data?: {
          pincode: string;
          serviceable: boolean;
          codAvailable: boolean;
          prepaidAvailable: boolean;
          pickupAvailable?: boolean;
          isOda?: boolean;
          city?: string;
          state?: string;
        };
      }>(`/shipping/serviceability/${encodeURIComponent(pincode)}`);
    },
    async calculateCost(params: { destPincode: string; weight?: number; mode?: string; paymentType?: string; orderAmount?: number }) {
      return request<any>('/shipping/calculate-cost', {
        method: 'POST',
        body: JSON.stringify(params),
      });
    },
    async trackShipment(waybill: string) {
      return request<any>(`/shipping/track/${encodeURIComponent(waybill)}`);
    },
  },
};

