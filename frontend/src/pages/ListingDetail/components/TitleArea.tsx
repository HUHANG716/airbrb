import { Button, Flex, List, Popover, Tag, Typography } from 'antd';
import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import styled from 'styled-components';
import { calcRating } from '../../../utils/utils';
import { BiCommentDetail } from 'react-icons/bi';
import { nanoid } from 'nanoid';
import { Address, Availability, Review } from '../../../types/listing';
import { Booking } from '../../../types/booking';

type Props = {
  title: string;
  reviews: Review[];
  address: Address;
  currentBookingsMy: Booking[];
  availability: Availability[];
};
const Title = styled(Typography.Text)`
  font-size: 1.5rem;
`;
const TextGroup = styled(Flex)`
  font-size: 0.75rem;
  align-items: center;
`;
const TitleArea = ({ title, reviews, address, currentBookingsMy, availability }: Props) => {
  return (
    <Flex
      vertical
      align='start'>
      <Title strong>{title}</Title>
      <TextGroup align='center'>
        <AiFillStar />
        &nbsp;
        {calcRating(reviews)} ·&nbsp;
        <BiCommentDetail />
        &nbsp;
        {reviews.length} · {address.address} &nbsp;
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
  );
};

export default TitleArea;
