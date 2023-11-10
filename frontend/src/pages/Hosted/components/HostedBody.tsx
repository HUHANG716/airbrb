import React from 'react';
import ListingCard from '../../../components/ListingCard/ListingCard';
import { Button, Flex } from 'antd';
import { useHosted } from '../context/HostedContext';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ResponsiveText } from '../../../styles/GlobalStyle';
const HostedCard = styled(ListingCard)`
  max-width: 30rem;
  min-width: 16rem;
`;
const ViewBookingButton = styled(Button)`
  padding-left: 0;
`;

const HostedBody = ({ className }: { className?: string }) => {
  const { listingsMy } = useHosted();

  return (
    <Flex
      className={className}
      gap='large'
      vertical>
      {listingsMy.map((listing) => {
        return (
          <Flex
            gap={'small'}
            key={listing.id}
            align='end'>
            <HostedCard
              coverStyle={{
                maxHeight: '10rem',
              }}
              viewer='owner'
              listing={listing}></HostedCard>
            <Link to={`${listing.id}/booking`}>
              <ViewBookingButton type='link'>
                <ResponsiveText>View Booking {'>'}</ResponsiveText>
              </ViewBookingButton>
            </Link>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default HostedBody;
