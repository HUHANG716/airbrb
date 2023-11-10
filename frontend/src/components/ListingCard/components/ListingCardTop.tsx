import React from 'react';
import { ACFlex, useListingCard } from '../ListingCard';

import { AiFillStar } from 'react-icons/ai';
import { Typography } from 'antd';

const ListingCardTop = () => {
  const { title, rating } = useListingCard();

  return (
    <ACFlex justify='space-between'>
      <Typography.Title level={5}>{title}</Typography.Title>
      <ACFlex>
        <AiFillStar key='star' />
        &nbsp;
        {rating || '~'}
      </ACFlex>
    </ACFlex>
  );
};
export default ListingCardTop;
