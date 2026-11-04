import { AuthTabs, AuthTabsProps } from './AuthTabs';

describe('AuthTabs', () => {
  it('is defined and functions as a React component', () => {
    expect(AuthTabs).toBeDefined();
    expect(typeof AuthTabs).toBe('function');
  });

  it('accepts activeTab props for login and signup', () => {
    let selected: 'login' | 'signup' = 'login';
    const props: AuthTabsProps = {
      activeTab: selected,
      onTabChange: (tab) => {
        selected = tab;
      },
    };

    expect(props.activeTab).toBe('login');
    props.onTabChange('signup');
    expect(selected).toBe('signup');
  });
});

