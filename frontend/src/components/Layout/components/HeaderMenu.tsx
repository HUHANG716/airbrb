import React from 'react';
import { Button, Dropdown, MenuProps } from 'antd';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useUser } from '../../../context/UserContext/UserContext';
import { useGlobalComponents } from '../../../context/GlobalComponentsContext/GlobalComponentsContext';
import { useHosted } from '../../../pages/Hosted/context/HostedContext';

const ItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px;
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
      key: '2',
      label: (
        <Link to='register'>
          <ItemWrapper>Sign up</ItemWrapper>
        </Link>
      ),
    },
    {
      type: 'divider',
    },
  ];
  return (
    <Dropdown
      menu={{ items: userInfo ? itemsAuth : itemsUnAuth }}
      trigger={['click']}>
      <Button
        shape='round'
        type='primary'>
        <MenuOutlined />
        <UserOutlined />
      </Button>
    </Dropdown>
  );
};

export default HeaderMenu;
