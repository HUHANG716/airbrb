import { Flex } from 'antd';
import React from 'react';
import { TextGroup, Title } from '../ListingDetail';
import { nItem } from '../../../utils/utils';

type Props = {
  propertyType: string;
  owner: string;
  numBathrooms: number;
  numBeds: number;
  numBedrooms: number;
};

const BasicInfo = ({ propertyType, owner, numBathrooms, numBeds, numBedrooms }: Props) => {
  return (
    <Flex vertical>
      <Title>{propertyType}</Title>
      <Title>hosted by {owner}</Title>
      <TextGroup>
        {nItem(numBedrooms, 'bedroom')} · {nItem(numBeds, 'bed')} · {nItem(numBathrooms, 'bathroom')}
      </TextGroup>
    </Flex>
  );
};

export default BasicInfo;
