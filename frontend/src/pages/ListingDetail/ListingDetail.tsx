import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useHosted } from '../Hosted/context/HostedContext';
import { Carousel, Divider, Flex, Typography } from 'antd';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import { calcBedsNum, calcRating, diffDays } from '../../utils/utils';

import { useBooking } from '../../context/BookingContext/BookingContext';

import TitleArea from './components/TitleArea';
import BasicInfo from './components/BasicInfo';
import BedDetail from './components/BedDetail';
import Amenities from './components/Amenities';
import ReviewArea from './components/ReviewArea';
import ListingDetailFooter from './components/ListingDetailFooter';
import { BOOKING_STATUS } from '../../constant/constant';
import { Review } from '../../types/listing';

const Wrapper = styled(Flex)`
  width: 100%;
`;

const Img = styled.img`
  object-fit: cover;
  object-position: center;
  height: 370px;
  width: 100%;
  min-width: 350px;
`;
const SubWrapper = styled(Flex)`
  padding: 3rem;
  width: 100%;
`;
const Slider = styled(Carousel)`
  width: 100%;
  margin: 0 auto;
`;

export const TextGroup = styled(Flex)`
  font-size: 0.75rem;
  align-items: center;
`;
export const Title = styled(Typography.Text)`
  font-size: 1.5rem;
`;

const ListingDetail = () => {
  const { id = '' } = useParams();
  const location = useLocation();
  const dateRange = location.state?.dateRange;
  console.log(dateRange);

  const { getOneListing } = useHosted();
  const { getBookingsMyOfListing } = useBooking();
  const currentBookingsMy = getBookingsMyOfListing(id);
  const currentBookingMyAccepted = currentBookingsMy?.find((booking) => booking.status === BOOKING_STATUS.ACCEPTED);
  const { thumbnail, metadata, price, reviews, title, owner, address, availability } = getOneListing(id) || {
    thumbnail: '',
    metadata: {
      otherPictures: [],
      propertyType: '',
      bedrooms: [],
      numBathrooms: 0,
      amenities: ['No information of amenities provided'],
    },
    availability: [],
    price: 0,
    reviews: [] as Review[],
    title: '',
    owner: '',
    address: {
      address: '',
    },
  };
  const { otherPictures, propertyType, bedrooms, numBathrooms, amenities } = metadata;

  return (
    <Wrapper vertical>
      {/* Slider */}
      <Slider>
        {[thumbnail, ...otherPictures].map((url) => (
          <Img
            alt='d'
            key={nanoid()}
            src={url}
          />
        ))}
      </Slider>
      <SubWrapper vertical>
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
      </SubWrapper>

      {/* Footer */}
      <ListingDetailFooter
        availability={availability}
        rating={calcRating(reviews)}
        numReviews={reviews.length}
        price={dateRange ? diffDays(dateRange[0], dateRange[1]) * price : price}
      />
    </Wrapper>
  );
};

export default ListingDetail;
