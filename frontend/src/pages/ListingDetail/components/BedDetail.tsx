import { Card, Col, Flex, Row, Space } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { Title } from '../ListingDetail';
import { flexCenter } from '../../../styles/FlexStyle';
import { nanoid } from 'nanoid';
import { Bedroom } from '../../../types/listing';
import { nItem } from '../../../utils/utils';
import Tag from '../../../components/Tag/Tag';

type Props = {
  bedrooms: Bedroom[];
};

const Wrapper = styled(Flex)`
  width: 100%;
`;
const GridItem = styled(Col)`
  ${flexCenter}
`;
const BedCard = styled(Card)`
  height: 120px;
  width: 100%;
`;
const BedDetail = ({ bedrooms }: Props) => {
  return (
    <Wrapper
      vertical
      justify='center'>
      <Title>Where you will sleep</Title>
      <Row gutter={[8, 8]}>
        {bedrooms.map(({ type, num }, index) => (
          <GridItem
            sm={12}
            xs={24}
            md={8}
            lg={8}
            xl={6}
            key={nanoid()}>
            <BedCard>
              <Space direction='vertical'>
                {'Bedroom ' + (index + 1)}
                {nItem(num, 'bed')}
                <Tag type='default'>{type}</Tag>
              </Space>
            </BedCard>
          </GridItem>
        ))}
      </Row>
    </Wrapper>
  );
};

export default BedDetail;
