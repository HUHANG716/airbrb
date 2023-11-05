import React from 'react';
import { useUser } from '../../context/UserContext/UserContext';
import { Button, Flex, Typography } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import HostedBody from '../Hosted/components/HostedBody';

const Wrapper = styled(Flex)`
  width: 100%;
`;
const { Title } = Typography;
const HostedHeader = ({ className }: { className?: string }) => {
  const { userInfo } = useUser();
  console.log(userInfo);
  return (
    <Flex className={className} align='center' justify='space-between'>
      <Title level={2}>Welcome, {userInfo?.email}</Title>
      <Link to='/hosting'>
        <Button size='large'>Create a listing</Button>
      </Link>
    </Flex>
  );
};

const Top = styled(HostedHeader)`
  width: 100%;
`;
const Body = styled(HostedBody)`
  width: 100%;
  margin-top: 5rem;
`;

const ListingHosted = () => {
  return (
    <Wrapper align='center' justify='flex-start' vertical>
      <Top />
      <Body />
    </Wrapper>
  );
};

export default ListingHosted;
