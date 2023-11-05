import React from 'react';
import ListingCard from '../../../components/ListingCard/ListingCard';
import { Flex } from 'antd';
import { useHosted } from '../context/HostedContext';
import styled from 'styled-components';
const Card = styled(ListingCard)`
  max-width: 30rem;
`;
const HostedBody = ({ className }: { className?: string }) => {
  const { listingsMy } = useHosted();

  return (
    <Flex className={className} gap='large' vertical>
      {listingsMy.map((listing) => {
        return (
          <Card
            coverStyle={{
              maxHeight: '13rem',
            }}
            viewer='owner'
            key={listing.id}
            listing={listing}></Card>
        );
      })}
    </Flex>
  );
};

export default HostedBody;
