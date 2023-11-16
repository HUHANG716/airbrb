import React, { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useHosted } from '../../context/HostedContext/HostedContext';
import { Carousel, Flex, Typography } from 'antd';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import { calcRating, diffDays } from '../../utils/utils';
import ListingDetailFooter from './components/ListingDetailFooter';
import { Review } from '../../types/listing';
import ListingDetailBody from './components/ListingDetailBody';

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
  const { getOneListing } = useHosted();
  const { thumbnail, metadata, price, reviews, title, owner, address, availability } = getOneListing(id) || {
    thumbnail: '',
    metadata: {
      otherPictures: [],
      propertyType: '',
      bedrooms: [],
      numBathrooms: 0,
      amenities: [],
    },
    availability: [],
    price: 0,
    reviews: [] as Review[],
    title: '',
    owner: '',
    address: {
      city: '',
      street: '',
    },
  };
  const { otherPictures, propertyType, bedrooms, numBathrooms, amenities } = metadata;
  const totalPrice = useMemo(() => (dateRange ? diffDays(dateRange[0], dateRange[1]) * price : price), [dateRange, price]);
  return (
    <Wrapper vertical>
      {/* Slider */}
      <Slider>
        {[thumbnail, ...otherPictures].map((url) => (
          <Img
            alt='listing image'
            key={nanoid()}
            src={url}
          />
        ))}
      </Slider>
      <ListingDetailBody
        availability={availability}
        title={title}
        owner={owner}
        address={address}
        propertyType={propertyType}
        numBathrooms={numBathrooms}
        bedrooms={bedrooms}
        amenities={amenities}
        reviews={reviews}
      />
      {/* Footer */}
      <ListingDetailFooter
        availability={availability}
        rating={calcRating(reviews)}
        numReviews={reviews.length}
        price={totalPrice}
      />
    </Wrapper>
  );
};

export default ListingDetail;
