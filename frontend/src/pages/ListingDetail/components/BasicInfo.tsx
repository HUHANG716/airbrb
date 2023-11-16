import { Card, Space } from 'antd';
import React from 'react';
import { TextGroup, Title } from '../ListingDetail';
import { nItem } from '../../../utils/utils';
import { StrongEllipsisText } from '../../../styles/GlobalStyle';

type Props = {
  propertyType: string;
  owner: string;
  numBathrooms: number;
  numBeds: number;
  numBedrooms: number;
};

const BasicInfo = ({ propertyType, owner, numBathrooms, numBeds, numBedrooms }: Props) => {
  return (
    <Card>
      <Space direction='vertical'>
        <Title>{propertyType}</Title>
        <StrongEllipsisText>Hosted by {owner}</StrongEllipsisText>
        <TextGroup>
          {nItem(numBedrooms, 'bedroom')} · {nItem(numBeds, 'bed')} · {nItem(numBathrooms, 'bathroom')}
        </TextGroup>
      </Space>
    </Card>
  );
};

export default BasicInfo;
