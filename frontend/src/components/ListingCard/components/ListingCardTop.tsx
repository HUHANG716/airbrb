import React from 'react';
import { ACFlex, useListingCard } from '../ListingCard';

import { AiFillStar } from 'react-icons/ai';
import styled from 'styled-components';

import { EllipsisText } from '../../../styles/GlobalStyle';

const StrongEllipsisText = styled(EllipsisText)`
  font-weight: 600;
  font-size: 1.1rem;
  cursor: default;
`;

const ListingCardTop = () => {
  const { title, rating } = useListingCard();

  return (
    <ACFlex justify='space-between'>
      <StrongEllipsisText title={title}>{title}</StrongEllipsisText>
      <ACFlex>
        <AiFillStar key='star' />
        &nbsp;
        {rating || '~'}
      </ACFlex>
    </ACFlex>
  );
};
export default ListingCardTop;
