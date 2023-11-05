import React from 'react';
import { BiBed, BiCommentDetail, BiBath } from 'react-icons/bi';
import { ACFlex, useListingCard } from '../ListingCard';
import { nanoid } from 'nanoid';
import { Tag } from 'antd';
import styled from 'styled-components';

const PropertyType = styled(Tag)`
  font-size: 0.75rem;
  margin-left: auto;
`;
const ListingCardBottom = () => {
  const { numBeds, numReviews, propertyType, numBathrooms } = useListingCard();
  return (
    <ACFlex gap='small'>
      {[
        [<BiBed key='bed' />, numBeds],
        [<BiBath key='bathroom' />, numBathrooms],
        [<BiCommentDetail key='comment' />, numReviews],
      ].map(([icon, value]) => (
        <ACFlex key={nanoid()}>
          {icon}&nbsp;
          {value}
        </ACFlex>
      ))}

      <PropertyType>{propertyType}</PropertyType>
    </ACFlex>
  );
};

export default ListingCardBottom;
