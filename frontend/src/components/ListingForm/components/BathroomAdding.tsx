import React from 'react';
import { Button } from 'antd';
import { ACFlex } from '../../ListingCard/ListingCard';
import { FullWidthItem } from '../ListingForm';

type Props = {
  count: number;

  setCount: (value: number) => void;
};
const BathroomAdding = ({ count, setCount }: Props) => {
  return (
    <FullWidthItem
      name='numBathrooms'
      label='Bathrooms'>
      <ACFlex justify='space-between'>
        <Button onClick={() => setCount(Math.max(0, count - 1))}>-</Button>
        {count}
        <Button onClick={() => setCount(count + 1)}>+</Button>
      </ACFlex>
    </FullWidthItem>
  );
};

export default BathroomAdding;
