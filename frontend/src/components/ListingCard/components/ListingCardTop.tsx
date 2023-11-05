import React from 'react';
import { ACFlex, useListingCard } from '../ListingCard';
import Title from 'antd/es/typography/Title';
import { AiFillStar } from 'react-icons/ai';

const ListingCardTop = () => {
  const { title, rating } = useListingCard();

  return (
    <ACFlex justify='space-between'>
      <Title level={3}>{title}</Title>
      <ACFlex>
        <AiFillStar key='star' />
        &nbsp;
        {rating || '~'}
      </ACFlex>
    </ACFlex>
  );
};
export default ListingCardTop;
