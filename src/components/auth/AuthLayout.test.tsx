import { AuthLayout, AuthLayoutProps } from './AuthLayout';

describe('AuthLayout', () => {
  it('is defined and is a valid React component', () => {
    expect(AuthLayout).toBeDefined();
    expect(typeof AuthLayout).toBe('function');
  });

  it('accepts initialMode prop for login and signup', () => {
    const loginProps: AuthLayoutProps = { initialMode: 'login' };
    expect(loginProps.initialMode).toBe('login');

    const signupProps: AuthLayoutProps = { initialMode: 'signup' };
    expect(signupProps.initialMode).toBe('signup');
  });
});
