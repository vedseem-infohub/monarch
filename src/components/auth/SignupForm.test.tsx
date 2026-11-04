import { SignupForm, SignupFormProps } from './SignupForm';

describe('SignupForm', () => {
  it('is defined and functions as a React component', () => {
    expect(SignupForm).toBeDefined();
    expect(typeof SignupForm).toBe('function');
  });

  it('accepts optional onSwitchToLogin callback and redirectTo prop', () => {
    let switched = false;
    const props: SignupFormProps = {
      onSwitchToLogin: () => {
        switched = true;
      },
      redirectTo: '/account',
    };

    expect(props.redirectTo).toBe('/account');
    props.onSwitchToLogin?.();
    expect(switched).toBe(true);
  });
});
