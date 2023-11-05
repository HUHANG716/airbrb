import React from 'react';

import { HostedProvider, useHosted } from '../Hosted/context/HostedContext';

import { Col, Row } from 'antd';
import ListingCard from '../../components/ListingCard/ListingCard';
import styled from 'styled-components';
import { flexCenter, fullWH } from '../../styles/FlexStyle';

const Home = () => {
  // 把 useHosted() 钩子移到 HostedProvider 内部的组件中
  return (
    <HostedProvider>
      <HomeContent />
    </HostedProvider>
  );
};
const Card = styled(ListingCard)`
  min-width: 270px;
  max-width: 400px;
`;
const Grid = styled(Row)`
  ${fullWH}
`;
const GridItem = styled(Col)`
  ${flexCenter}
`;
const responsive = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 8,
  xl: 8,
  xxl: 6,
};
const HomeContent = () => {
  const { listings } = useHosted();
  return (
    <Grid gutter={[16, 16]}>
      {listings.map((listing) => (
        <GridItem key={listing.id} {...responsive}>
          <Card
            coverStyle={{
              height: '13rem',
            }}
            listing={listing}></Card>
        </GridItem>
      ))}
    </Grid>
  );
};
export default Home;
