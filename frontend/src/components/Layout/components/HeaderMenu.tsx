import React from 'react';
import { Button, Dropdown, MenuProps } from 'antd';
import { UserOutlined, MenuOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useUser } from '../../../context/UserContext/UserContext';

const ItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px;
`;

const HeaderMenu = () => {
  const { logout } = useUser();
  const items: MenuProps['items'] = [
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
    {
      key: '3',
      label: (
        <Link to='/hosted'>
          <ItemWrapper>Manage listings</ItemWrapper>
        </Link>
      ),
    },

    {
      key: '4',
      label: (
        <Link to='/' onClick={logout}>
          <ItemWrapper>Log out</ItemWrapper>
        </Link>
      ),
    },
  ];
  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <Button shape='round' type='primary'>
        <MenuOutlined />
        <UserOutlined />
      </Button>
    </Dropdown>
  );
};

export default HeaderMenu;
