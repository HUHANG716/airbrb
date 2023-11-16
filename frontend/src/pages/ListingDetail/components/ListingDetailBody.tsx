import { Divider, Flex } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { Address, Availability, Bedroom, Review } from '../../../types/listing';
import TitleArea from './TitleArea';
import BasicInfo from './BasicInfo';
import BedDetail from './BedDetail';
import Amenities from './Amenities';
import ReviewArea from './ReviewArea';
import { useBooking } from '../../../context/BookingContext/BookingContext';
import { useParams } from 'react-router-dom';
import { BOOKING_STATUS } from '../../../constant/constant';
import { calcBedsNum } from '../../../utils/utils';

type Props = {
  title: string;
  owner: string;
  address: Address;
  propertyType: string;
  numBathrooms: number;
  bedrooms: Bedroom[];
  amenities: string[];
  reviews: Review[];
  availability: Availability[];
};

const Wrapper = styled(Flex)`
  padding: 3rem;
  width: 100%;
`;
const ListingDetailBody = ({ title, owner, address, propertyType, numBathrooms, bedrooms, amenities, reviews, availability }: Props) => {
  const { id = '' } = useParams();
  const { getBookingsMyOfListing } = useBooking();
  const currentBookingsMy = getBookingsMyOfListing(id);
  const currentBookingMyAccepted = currentBookingsMy?.find((booking) => booking.status === BOOKING_STATUS.ACCEPTED);
  return (
    <Wrapper vertical>
      {/* Title */}
      <TitleArea
        title={title}
        reviews={reviews}
        address={address}
        currentBookingsMy={currentBookingsMy}
        availability={availability}
      />
      <Divider />
      {/* Basic Info */}
      <BasicInfo
        numBathrooms={numBathrooms}
        numBeds={calcBedsNum(bedrooms)}
        numBedrooms={bedrooms.length}
        propertyType={propertyType}
        owner={owner}
      />
      {/* Where you'll sleep */}
      <Divider />
      <BedDetail bedrooms={bedrooms} />
      {/* Where this place offers */}
      <Divider />
      <Amenities amenities={amenities} />
      {/* Review */}
      <Divider />
      <ReviewArea
        reviews={reviews}
        currentBookingMyAccepted={currentBookingMyAccepted}
      />
    </Wrapper>
  );
};

export default ListingDetailBody;
