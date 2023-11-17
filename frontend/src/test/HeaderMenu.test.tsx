import React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import HeaderMenu from '../components/Layout/components/HeaderMenu';
import { useUser } from '../context/UserContext/UserContext';
import { Dropdown } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';

type Mock = jest.Mock;
jest.mock('../context/GlobalComponentsContext/GlobalComponentsContext', () => ({
  useGlobalComponents: () => ({
    notify: {
      success: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
    },
  }),
}));
jest.mock('../context/UserContext/UserContext');
const getMenuShallowWrapper = (wrapper: ShallowWrapper) => {
  const dropdown = wrapper.find(Dropdown);

  const { items } = dropdown.props().menu as {
    items: (ItemType & { label: React.ReactNode })[];
  };

  const itemsNode = items.map((item: { label: React.ReactNode }) => item?.label);
  const MenuWrapper = shallow(
    <div>
      {itemsNode.map((node: React.ReactNode, index) => (
        <div key={`node-${index}`}>{node}</div>
      ))}
    </div>
  );
  return MenuWrapper;
};
describe('HeaderMenu', () => {
  it('should show login and sign-up options when not logged in', () => {
    (useUser as Mock).mockReturnValue({
      userInfo: null,
      login: jest.fn(),
      logout: jest.fn(),
    });

    const wrapper = shallow(<HeaderMenu />);
    const Menu = getMenuShallowWrapper(wrapper);
    expect(Menu.find('Link[to="login"]').exists()).toBe(true);
    expect(Menu.find('Link[to="register"]').exists()).toBe(true);
  });

  it('should show manage listings and logout options when logged in', () => {
    // Render the HeaderMenu component within the UserContextProvider
    // with a logged-in user.
    (useUser as Mock).mockReturnValue({
      userInfo: {
        email: '',
      },
      login: jest.fn(),
      logout: jest.fn(),
    });
    const wrapper = shallow(<HeaderMenu />);
    const Menu = getMenuShallowWrapper(wrapper);
    expect(Menu.find('Link[to="/listing/hosted"]').exists()).toBe(true);
    expect(Menu.find('Link[to="/"]').exists()).toBe(true);
  });
  it('should call logout when the logout button is clicked', () => {
    const mockLogout = jest.fn();
    (useUser as Mock).mockReturnValue({
      userInfo: {
        email: '',
      },
      login: jest.fn(),
      logout: mockLogout,
    });
    const wrapper = shallow(<HeaderMenu />);

    const Menu = getMenuShallowWrapper(wrapper);
    const logoutLink = Menu.find('Link[to="/"]');
    logoutLink.simulate('click');
    expect(mockLogout).toHaveBeenCalled();
  });
});
