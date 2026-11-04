import { LoginForm, LoginFormProps } from './LoginForm';

describe('LoginForm', () => {
  it('is defined and is a valid React component', () => {
    expect(LoginForm).toBeDefined();
    expect(typeof LoginForm).toBe('function');
  });

  it('accepts optional onSwitchToSignup callback and redirectTo destination', () => {
    let switched = false;
    const props: LoginFormProps = {
      onSwitchToSignup: () => {
        switched = true;
      },
      redirectTo: '/checkout',
    };

    expect(props.redirectTo).toBe('/checkout');
    props.onSwitchToSignup?.();
    expect(switched).toBe(true);
  });
});
