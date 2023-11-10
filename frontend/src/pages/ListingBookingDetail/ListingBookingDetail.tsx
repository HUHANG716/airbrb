import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext/BookingContext';
import { Button, Card, Collapse, Flex, Space } from 'antd';
import { useHosted } from '../Hosted/context/HostedContext';

import { diffDays, nItem } from '../../utils/utils';
import styled from 'styled-components';

import dayjs, { defaultDayjs } from '../../utils/dayjs';
import { BOOKING_STATUS } from '../../constant/constant';
import { Id } from '../../types/global';
import apiReq from '../../utils/apiReq';
import { useGlobalComponents } from '../../context/GlobalComponentsContext/GlobalComponentsContext';
import Tag, { TagType } from '../../components/Tag/Tag';
import { BookingStatus } from '../../types/booking';
import { flexCenter } from '../../styles/FlexStyle';

const ListItem = styled(Collapse.Panel)`
  padding: 0;
  font-size: 0.75rem;
`;
const Wrapper = styled(Flex)`
  width: 100%;
`;
const StatusTag = styled(Tag)`
  ${flexCenter}
  width: 5rem;
`;
const ListingBookingDetail = () => {
  const { id = '' } = useParams();
  const { getBookingsOfListing, requestBookings } = useBooking();
  const { getOneListing } = useHosted();
  const { notify } = useGlobalComponents();
  const { postedOn, published } = getOneListing(id) || {
    postedOn: undefined,
  };

  const bookings = getBookingsOfListing(id);

  const duration = useMemo(() => published && postedOn && defaultDayjs().diff(defaultDayjs(postedOn), 'day') + 1, [postedOn, published]);
  const currentYear = defaultDayjs().get('year');
  console.log(duration);

  const { profit, totalDays } = bookings.reduce(
    (total, { dateRange, status, totalPrice }) => {
      const { start, end } = dateRange;

      if (status !== BOOKING_STATUS.ACCEPTED) {
        return total;
      }

      if (dayjs(end).year() !== currentYear) {
        return total;
      }

      return {
        profit: total.profit + totalPrice,
        totalDays: total.totalDays + diffDays(start, end),
      };
    },
    {
      profit: 0,
      totalDays: 0,
    }
  );
  const handleAccept = async (bookingId: Id) => {
    try {
      await apiReq.put(`/bookings/accept/${bookingId}`);
      notify.success('Accept successfully');
      requestBookings();
    } catch (err) {
      notify.error(err as string);
    }
  };
  const handleDeny = async (bookingId: Id) => {
    try {
      await apiReq.put(`/bookings/decline/${bookingId}`);
      notify.success('Deny successfully');
      requestBookings();
    } catch (err) {
      notify.error(err as string);
    }
  };
  const tagTypeDict: Record<BookingStatus, TagType> = {
    [BOOKING_STATUS.ACCEPTED]: 'success',
    [BOOKING_STATUS.DECLINED]: 'error',
    [BOOKING_STATUS.PENDING]: 'default',
  };
  return (
    <Wrapper vertical>
      <Card>
        <Space direction='vertical'>
          {`Total Booked: ${nItem(totalDays, 'night')}`}
          {`Profit of this year: $${profit}`}
          {`Published: ${duration ? nItem(duration, 'day') : 'Not published'}`}
        </Space>
      </Card>
      <Collapse>
        {bookings.map(({ id: bookingId, status, owner, dateRange, totalPrice }) => {
          return (
            <ListItem
              header={
                <Space>
                  <StatusTag type={tagTypeDict[status]}>{status}</StatusTag>
                  {`Booked By: ${owner}`}
                </Space>
              }
              key={bookingId}>
              <Space direction='vertical'>
                {`Date Range: ${dateRange.start} - ${dateRange.end}`}
                {`${nItem(diffDays(dateRange.start, dateRange.end), 'night')}`}
                {`Total Price: $${totalPrice}`}

                {status === BOOKING_STATUS.PENDING && (
                  <Space>
                    <Button
                      type='primary'
                      onClick={() => handleAccept(bookingId)}>
                      Accept
                    </Button>
                    <Button
                      type='primary'
                      onClick={() => handleDeny(bookingId)}
                      danger>
                      Deny
                    </Button>
                  </Space>
                )}
              </Space>
            </ListItem>
          );
        })}
      </Collapse>
    </Wrapper>
  );
};

export default ListingBookingDetail;
