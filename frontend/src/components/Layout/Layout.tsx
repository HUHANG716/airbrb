import React from 'react';
import { Layout as _Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { flexCenter, flexH, flexV } from '../../styles/FlexStyle';
import SearchBar from './components/SearchBar';
import HeaderMenu from './components/HeaderMenu';
import Logo from './components/Logo';

const { Header: _Header, Content: _Content, Footer: _Footer } = _Layout;

const Wrapper = styled(_Layout)`
  display: flex;
  min-height: 100vh;
`;
const Header = styled(_Header)`
  ${flexH}
  align-items: center;
  justify-content: space-between;
`;
const Content = styled(_Content)`
  ${flexV}
  align-items: center;
  padding: 4rem;
`;
const Footer = styled(_Footer)`
  ${flexCenter}
`;
const Layout = () => {
  return (
    <Wrapper>
      <Header>
        <Logo />
        <SearchBar />
        <HeaderMenu />
      </Header>
      <Content>
        <Outlet />
      </Content>

      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Wrapper>
  );
};

export default Layout;
