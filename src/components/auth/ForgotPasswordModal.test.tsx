import { ForgotPasswordModal, ForgotPasswordModalProps } from './ForgotPasswordModal';

describe('ForgotPasswordModal', () => {
  it('is defined and functions as a React component', () => {
    expect(ForgotPasswordModal).toBeDefined();
    expect(typeof ForgotPasswordModal).toBe('function');
  });

  it('handles modal prop definitions cleanly', () => {
    let closed = false;
    const props: ForgotPasswordModalProps = {
      isOpen: true,
      onClose: () => {
        closed = true;
      },
      defaultEmail: 'radhika@monarch-client.com',
    };

    expect(props.isOpen).toBe(true);
    expect(props.defaultEmail).toBe('radhika@monarch-client.com');
    props.onClose();
    expect(closed).toBe(true);
  });
});

