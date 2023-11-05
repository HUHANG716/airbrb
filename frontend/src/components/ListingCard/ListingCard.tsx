import React, { createContext, useContext } from 'react';
import { Card as _Card, Flex, Typography } from 'antd';

import styled from 'styled-components';

import ListingCardBottom from './components/ListingCardBottom';
import ListingCardTop from './components/ListingCardTop';

import { Link, useNavigate } from 'react-router-dom';

import PublishedDropdown from './components/PublishedDropdown';
import { Listing, Viewer } from '../../types/listing';
import { useHosted } from '../../pages/Hosted/context/HostedContext';
import { fullWH } from '../../styles/FlexStyle';
export const ACFlex = styled(Flex)`
  align-items: center;
`;
const { Title } = Typography;
const Image = styled.img`
  cursor: pointer;
  object-fit: cover;
  transition: transform 0.2s ease-in-out;
`;
const Card = styled(_Card)`
  overflow: hidden;
  width: 100%;
`;
const processListing = (listing: Listing) => {
  const { id, title, thumbnail, price, metadata, reviews } = listing;
  const { bedrooms = [], propertyType, numBathrooms } = metadata;
  const numBeds = bedrooms.reduce((acc, cur) => acc + cur.num, 0);
  const rating = reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length || 0;
  const numReviews = reviews.length;
  return { title, thumbnail, price, propertyType, numBeds, numBathrooms, rating, numReviews, id };
};
type Props = {
  listing: Listing;
  className?: string;
  viewer?: Viewer;
  coverStyle?: React.CSSProperties;
};
const Del = styled(Typography.Text)`
  ${fullWH}
`;
type ListingCardContextType = ReturnType<typeof processListing> & { viewer: string };
const ListingCardContext = createContext<ListingCardContextType>({} as ListingCardContextType);
export const useListingCard = () => useContext(ListingCardContext);
const ListingCard = ({ listing, className, viewer = 'common', coverStyle }: Props) => {
  const listingProcessed = processListing(listing);
  const { listingDel } = useHosted();
  const { thumbnail, price, id } = listingProcessed;
  const nav2 = useNavigate();
  const nav2Edit = () => {
    nav2(`/hosted/edit/${id}`);
  };
  const actionsRender = {
    owner: [
      <Link key={'1'} to={`/hosted/edit/${id}`}>
        Edit
      </Link>,
      <PublishedDropdown key={'2'} />,
      <Del onClick={() => listingDel(id)} key={'3'}>
        Delete
      </Del>,
    ],
    common: [<PublishedDropdown key={'1'} />],
  };
  return (
    <ListingCardContext.Provider value={{ ...listingProcessed, viewer }}>
      <Card bordered size='small' title={<ListingCardTop />} actions={actionsRender[viewer]} className={className} cover={<Image style={coverStyle} onClick={nav2Edit} alt='Pic' src={thumbnail} />}>
        <Flex vertical gap={'small'}>
          <Title level={5}>${price}/night</Title>
          <ListingCardBottom />
        </Flex>
      </Card>
    </ListingCardContext.Provider>
  );
};

export default ListingCard;
