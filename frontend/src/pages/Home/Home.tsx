import React, { useEffect, useMemo, useState } from 'react';

import { useHosted } from '../Hosted/context/HostedContext';

import { Col, Flex, Row } from 'antd';
import ListingCard from '../../components/ListingCard/ListingCard';
import styled from 'styled-components';
import { flexCenter, fullWH } from '../../styles/FlexStyle';
import { useNavigate } from 'react-router-dom';
import { BED_THRESHOLD, PRICE_THRESHOLD, useSearch } from '../../context/SearchContext/SearchContext';
import { useBooking } from '../../context/BookingContext/BookingContext';
import { Listing } from '../../types/listing';
import { isDateEmpty, isEquivalent } from '../../utils/utils';
import { Booking } from '../../types/booking';
import { CommonContentWrapper } from '../../styles/GlobalStyle';
import Tag from '../../components/Tag/Tag';
import { IoPricetagOutline } from 'react-icons/io5';
import { TbArrowsSort } from 'react-icons/tb';
import { BiBed } from 'react-icons/bi';
import { AiOutlineCalendar } from 'react-icons/ai';

const Home = () => {
  return <HomeContent />;
};
const HomeListingCard = styled(ListingCard)`
  min-width: 280px;
  max-width: 350px;
`;
const Grid = styled(Row)`
  margin-top: 1rem;
  ${fullWH}
`;
const GridItem = styled(Col)`
  ${flexCenter}
`;
const FilterParamsWrapper = styled(Flex)`
  flex-wrap: wrap;
`;
const responsive = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 8,
  xl: 8,
  xxl: 6,
};

const sortForBookingFirst = (listings: Listing[], bookingsMy: Booking[]) => {
  const [booked, unBooked] = listings.reduce(
    ([booked, unBooked], listing) => {
      const list = bookingsMy.some((booking) => isEquivalent(booking.listingId, listing.id)) ? booked : unBooked;
      list.push(listing);
      return [booked, unBooked];
    },
    [[], []] as [Listing[], Listing[]]
  );
  return [...booked, ...unBooked];
};

const HomeContent = () => {
  const { listingsPublished } = useHosted();
  const [listings, setListings] = useState(listingsPublished);
  const { signalForFilter, doFilter, resetSearchParams, searchParams } = useSearch();
  const { sortByRating, numBedroomsRange, priceRange, dateRange } = searchParams;
  const { bookingsMy } = useBooking();
  const nav2 = useNavigate();
  const bookingFirstListing = useMemo(() => sortForBookingFirst(listingsPublished, bookingsMy), [listingsPublished, bookingsMy]);
  const { sortMethod, price, beds, date } = useMemo(() => {
    return {
      sortMethod: sortByRating,
      price: `${priceRange[0]} - ${priceRange[1] === PRICE_THRESHOLD ? `${PRICE_THRESHOLD}+` : priceRange[1]}`,
      beds: `${numBedroomsRange[0]} - ${numBedroomsRange[1] === BED_THRESHOLD ? `${BED_THRESHOLD}+` : numBedroomsRange[1]}`,
      date: isDateEmpty(dateRange) ? 'All' : `${dateRange[0]} - ${dateRange[1]}`,
    };
  }, [signalForFilter]);
  useEffect(() => {
    setListings(bookingFirstListing);
  }, [bookingFirstListing]);

  useEffect(() => {
    doFilter(bookingFirstListing, (res) => setListings(res));
  }, [signalForFilter]);
  // reset search params when unmount
  useEffect(() => {
    return () => {
      resetSearchParams();
    };
  }, []);
  return (
    <CommonContentWrapper vertical>
      {/* Top */}
      <FilterParamsWrapper
        gap={'small'}
        justify='center'>
        <Tag>
          <TbArrowsSort /> {sortMethod}
        </Tag>
        <Tag>
          <IoPricetagOutline /> {price}
        </Tag>
        <Tag>
          <BiBed />
          {beds}
        </Tag>
        <Tag>
          <AiOutlineCalendar /> {date}
        </Tag>
      </FilterParamsWrapper>
      {/* Body */}
      <Grid gutter={[16, 16]}>
        {listings.map((listing) => (
          <GridItem
            key={listing.id}
            {...responsive}>
            <HomeListingCard
              onClick={() => {
                nav2(`/listing/${listing.id}`, {
                  state: {
                    query: listing?.query,
                  },
                });
              }}
              coverStyle={{
                width: '100%',
                maxHeight: '250px',
              }}
              listing={listing}></HomeListingCard>
          </GridItem>
        ))}
      </Grid>
    </CommonContentWrapper>
  );
};
export default Home;
