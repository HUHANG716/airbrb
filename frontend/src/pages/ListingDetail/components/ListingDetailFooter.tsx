import { Button, Card, DatePicker, Flex, Modal } from 'antd';
import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import styled from 'styled-components';
import dayjs, { Dayjs } from '../../../utils/dayjs';
import { Range } from '../../../types/global';
import { useGlobalComponents } from '../../../context/GlobalComponentsContext/GlobalComponentsContext';
import { Availability } from '../../../types/listing';
import apiReq from '../../../utils/apiReq';
import { useLocation, useParams } from 'react-router-dom';

import { useBooking } from '../../../context/BookingContext/BookingContext';
import { diffDays, nItem } from '../../../utils/utils';

const Wrapper = styled(Card)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  padding: 0 2rem;
`;
const FooterContent = styled(Flex)``;
const FooterLeft = styled(Flex)`
  font-size: 0.75rem;
`;
const Price = styled(Flex)`
  font-weight: bold;
`;
const Booking = styled(Button)``;
type Props = {
  numReviews: number;
  rating: string;
  price: number;
  availability: Availability[];
};
const ListingDetailFooter = ({ rating, numReviews, price, availability }: Props) => {
  const { id = '' } = useParams();
  const { notify } = useGlobalComponents();
  const location = useLocation();
  const { dateRange, nights } = location.state?.query || {
    dateRange: ['', ''],
    nights: null,
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState<Range<string>>(dateRange);
  const { requestBookings } = useBooking();
  const totalDays = diffDays(bookingDate[0], bookingDate[1]);
  const totalPrice = totalDays * price;
  const disabledDate = (current: Dayjs) => {
    return !availability.some((range) => {
      const start = dayjs(range.start);
      const end = dayjs(range.end);
      return current.isBetween(start, end, 'day', '[]');
    });
  };
  const handleBooking = async () => {
    if (dayjs(bookingDate[0]).isAfter(dayjs(bookingDate[1]))) {
      notify.error('Start date should be before end date');
      return;
    }
    const requestBody = {
      dateRange: {
        start: bookingDate[0],
        end: bookingDate[1],
      },
      totalPrice,
    };

    try {
      await apiReq.post(`/bookings/new/${id}`, requestBody);
      notify.success('Booking created successfully!');
      setIsModalOpen(false);
      setBookingDate(['', '']);
      requestBookings();
    } catch (err) {
      notify.error(err as string);
    }
  };
  return (
    <Wrapper size='small'>
      <FooterContent
        justify='space-between'
        align='center'>
        <FooterLeft vertical>
          <Price>${nights ? price * nights : price}</Price>
          <Flex align='center'>
            <AiFillStar />
            {rating} ·&nbsp;
            <BiCommentDetail />
            &nbsp;
            {numReviews}
          </Flex>
        </FooterLeft>
        <Modal
          destroyOnClose
          style={{ top: 20 }}
          open={isModalOpen}
          onOk={handleBooking}
          onCancel={() => setIsModalOpen(false)}
          title='Booking'>
          <Flex
            gap='large'
            vertical>
            <DatePicker
              value={bookingDate[0] ? dayjs(bookingDate[0]) : null}
              format={'DD/MM/YYYY'}
              onChange={(_, dateString) => {
                setBookingDate([dateString, bookingDate[1]]);
              }}
              disabledDate={disabledDate}
              placeholder='Start'
            />

            <DatePicker
              value={bookingDate[1] ? dayjs(bookingDate[1]) : null}
              onChange={(_, dateString) => {
                setBookingDate([bookingDate[0], dateString]);
              }}
              format={'DD/MM/YYYY'}
              disabledDate={disabledDate}
              placeholder='End'
            />
            {totalDays > 0 && <>{`Total: $${nItem(totalPrice, 'Night')}: ${totalDays}  `}</>}
          </Flex>
        </Modal>

        <Booking
          type='primary'
          onClick={() => setIsModalOpen(true)}>
          Book
        </Booking>
      </FooterContent>
    </Wrapper>
  );
};

export default ListingDetailFooter;
