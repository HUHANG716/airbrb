import React, { createContext, useContext } from 'react';
import { Card as _Card, Flex, Space, Typography } from 'antd';

import styled from 'styled-components';

import ListingCardBottom from './components/ListingCardBottom';
import ListingCardTop from './components/ListingCardTop';

import { useNavigate } from 'react-router-dom';

import PublishedDropdown from './components/PublishedDropdown';
import { Listing, Viewer } from '../../types/listing';
import { useHosted } from '../../pages/Hosted/context/HostedContext';

import { handleEnter, processListing } from '../../utils/utils';
import Tag from '../Tag/Tag';
import { useBooking } from '../../context/BookingContext/BookingContext';
import { ResponsiveText } from '../../styles/GlobalStyle';

export const ACFlex = styled(Flex)`
  align-items: center;
`;

const Image = styled.img`
  cursor: pointer;
  object-fit: cover;
  border-radius: 0;
  transition: transform 0.2s ease-in-out;
`;
const Card = styled(_Card)`
  overflow: hidden;
  width: 100%;
`;

type Props = {
  listing: Listing;
  className?: string;
  viewer?: Viewer;
  coverStyle?: React.CSSProperties;
  onClick?: () => void;
};

type ListingCardContextType = ReturnType<typeof processListing> & {
  viewer: string;
};
const ListingCardContext = createContext<ListingCardContextType>({} as ListingCardContextType);
export const useListingCard = () => useContext(ListingCardContext);
const ListingCard = ({ listing, className = '', viewer = 'common', coverStyle, onClick }: Props) => {
  const listingProcessed = processListing(listing);
  const { listingDel } = useHosted();
  const nav = useNavigate();
  const { getBookingsMyOfListing } = useBooking();
  const { thumbnail, price, id } = listingProcessed;
  const { nights } = listing?.query || {
    nights: null,
  };
  const priceRenderStr =
    nights === null
      ? `$${price} / night`
      : `
  $${price * nights} total
`;
  const haveBooked = Boolean(getBookingsMyOfListing(id).length);
  const actionsRender = {
    owner: [
      <ResponsiveText
        key={'0'}
        role='link'
        onClick={() => nav(`/listing/hosted/${id}/edit`)}
        onKeyDown={(e) => handleEnter(e, () => nav(`/listing/hosted/${id}/edit`))}
        tabIndex={0}>
        Edit
      </ResponsiveText>,

      <PublishedDropdown key={'1'} />,

      <ResponsiveText
        role='button'
        tabIndex={0}
        onKeyDown={(e) => handleEnter(e, () => listingDel(id))}
        onClick={() => listingDel(id)}
        key={'3'}>
        Delete
      </ResponsiveText>,
    ],
    common: [<PublishedDropdown key={'4'} />],
  };
  return (
    <ListingCardContext.Provider value={{ ...listingProcessed, viewer }}>
      <Card
        bordered={false}
        size='small'
        actions={actionsRender[viewer]}
        className={className}
        cover={
          <Image
            tabIndex={0}
            onKeyDown={(e) => {
              e.key === 'Enter' && onClick && onClick();
            }}
            style={coverStyle}
            onClick={onClick}
            alt='Pic'
            src={thumbnail}
          />
        }>
        <Flex
          vertical
          gap={'small'}>
          <ListingCardTop />
          <Space>
            <Typography.Text strong>{priceRenderStr}</Typography.Text>
            {nights && <Tag>{nights + ' night'}</Tag>}
          </Space>
          {haveBooked && <Tag>This is your booking</Tag>}
          <ListingCardBottom />
        </Flex>
      </Card>
    </ListingCardContext.Provider>
  );
};

export default ListingCard;
