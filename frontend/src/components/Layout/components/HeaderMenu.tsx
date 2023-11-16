import React from 'react';
import { Button, Dropdown, MenuProps } from 'antd';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useUser } from '../../../context/UserContext/UserContext';
import { useGlobalComponents } from '../../../context/GlobalComponentsContext/GlobalComponentsContext';
import { useHosted } from '../../../context/HostedContext/HostedContext';
import { ResponsiveText, sm } from '../../../styles/GlobalStyle';
import { flexCenter } from '../../../styles/FlexStyle';

const ItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px;
`;

const MenuBtn = styled(Button)`
  ${flexCenter}
  ${sm`width:50px;`}
`;
const HeaderMenu = () => {
  const { logout, userInfo } = useUser();
  const { notify } = useGlobalComponents();
  const { reloadHosted } = useHosted();
  const itemsAuth: MenuProps['items'] = [
    {
      key: '3',
      label: (
        <Link to='/listing/hosted'>
          <ItemWrapper>Manage listings</ItemWrapper>
        </Link>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: '4',
      label: (
        <Link
          to='/'
          onClick={() => {
            logout();
            reloadHosted();
            notify.info('Log out successfully!');
          }}>
          <ItemWrapper>Log out</ItemWrapper>
        </Link>
      ),
    },
  ];
  const itemsUnAuth: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link to='login'>
          <ItemWrapper>Log in</ItemWrapper>
        </Link>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: (
        <Link to='register'>
          <ItemWrapper>Sign up</ItemWrapper>
        </Link>
      ),
    },
  ];
  return (
    <Dropdown
      menu={{ items: userInfo ? itemsAuth : itemsUnAuth }}
      trigger={['click']}>
      <MenuBtn
        aria-label='menu trigger'
        shape='round'
        type='primary'>
        {[
          {
            key: 'menu',
            label: <MenuOutlined />,
          },
          {
            key: 'user',
            label: <UserOutlined />,
          },
        ].map(({ key, label }) => (
          <ResponsiveText key={key}>{label}</ResponsiveText>
        ))}
      </MenuBtn>
    </Dropdown>
  );
};

export default HeaderMenu;
