import { Button, Card, Flex, List, Popover, Tag } from 'antd';
import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import styled from 'styled-components';
import { calcRating } from '../../../utils/utils';
import { BiCommentDetail } from 'react-icons/bi';
import { nanoid } from 'nanoid';
import { Address, Availability, Review } from '../../../types/listing';
import { Booking } from '../../../types/booking';
import { EllipsisText } from '../../../styles/GlobalStyle';

type Props = {
  title: string;
  reviews: Review[];
  address: Address;
  currentBookingsMy: Booking[];
  availability: Availability[];
};
const Title = styled(EllipsisText)`
  width: 100%;
  font-size: 1.5rem;
`;
const TextGroup = styled(Flex)`
  font-size: 0.75rem;
  align-items: center;
`;
const MetaItem = styled(EllipsisText)`
  width: 100%;
`;

const TitleArea = ({ title, reviews, address, currentBookingsMy, availability }: Props) => {
  return (
    <Card>
      <Flex
        vertical
        align='start'>
        <Title title={title}>{title}</Title>
        <TextGroup align='center'>
          <AiFillStar />
          {calcRating(reviews)} &nbsp;
          <BiCommentDetail />
          &nbsp;
          {reviews.length}
          <Popover
            trigger={['hover', 'click', 'focus']}
            content={
              <List size='small'>
                {availability.map((range) => (
                  <List.Item key={nanoid()}>
                    {range.start} - {range.end}
                  </List.Item>
                ))}
              </List>
            }>
            <Button type='link'>Available Dates</Button>
          </Popover>
        </TextGroup>
        <MetaItem title={`${address.city}, ${address.street}`}>
          {address.city}, {address.street}
        </MetaItem>
        {/* Booking status */}
        {currentBookingsMy.length > 0 && (
          <Popover
            trigger={['hover', 'click', 'focus']}
            content={
              <List size='small'>
                {currentBookingsMy.map(({ status, dateRange }) => {
                  return (
                    <List.Item key={nanoid()}>
                      {dateRange.start} - {dateRange.end}&nbsp;
                      <Tag>{status}</Tag>
                    </List.Item>
                  );
                })}
              </List>
            }>
            <Button
              type='link'
              style={{
                padding: 0,
              }}>
              Booking Status
            </Button>
          </Popover>
        )}
      </Flex>
    </Card>
  );
};

export default TitleArea;
