import { Flex } from 'antd';
import { nanoid } from 'nanoid';
import React from 'react';
import { Title } from '../ListingDetail';
import Tag from '../../../components/Tag/Tag';

type Props = {
  amenities: string[];
};

const Amenities = ({ amenities }: Props) => {
  return (
    <Flex
      gap={'small'}
      vertical>
      <Title>What this place offers</Title>
      {amenities?.map((amenity) => (
        <Tag key={nanoid()}>{amenity}</Tag>
      ))}
    </Flex>
  );
};

export default Amenities;
