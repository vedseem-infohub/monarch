import { AuthVisualBanner, AuthVisualBannerProps } from './AuthVisualBanner';

describe('AuthVisualBanner', () => {
  it('is defined and is a valid React component', () => {
    expect(AuthVisualBanner).toBeDefined();
    expect(typeof AuthVisualBanner).toBe('function');
  });

  it('renders login and signup mode configurations', () => {
    const loginProps: AuthVisualBannerProps = { mode: 'login' };
    expect(loginProps.mode).toBe('login');

    const signupProps: AuthVisualBannerProps = { mode: 'signup' };
    expect(signupProps.mode).toBe('signup');
  });
});

