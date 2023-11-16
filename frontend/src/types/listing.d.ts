import { BEDROOM_TYPES, PLACE_TYPES } from '../constant/constant';
import { Id, Img, Range } from './global';
import { UploadChangeParam } from 'antd/es/upload';

interface Address {
  city: string;
  street: string;
}
interface Availability {
  start: string;
  end: string;
}
type BedroomType = (typeof BEDROOM_TYPES)[number];
type PlaceType = (typeof PLACE_TYPES)[number];
type Viewer = 'owner' | 'common';
interface Bedroom {
  type: BedroomType;
  num: number;
}
interface Metadata {
  bedrooms: Bedroom[];
  numBathrooms: number;
  otherPictures: Img[];
  amenities: string[];
  propertyType: PlaceType;
}
interface Review {
  from: string;
  comment: string;
  rating: 1 | 2 | 3 | 4 | 5;
}
interface Listing {
  title: string;
  address: Address;
  price: number;
  thumbnail: string;
  metadata: Metadata;
  id: Id;
  reviews: Review[];
  postedOn: string;
  owner: string;
  published: boolean;
  availability: Availability[];
  query?: {
    dateRange: Range<string>;
    nights: number;
  };
}
interface ListingCreateForm extends Omit<Metadata, 'otherPictures'>, Address {
  title: string;
  price: number;
  thumbs: UploadChangeParam;
}

interface ListingCreateRequest {
  title: string;
  address: Address;
  price: number;
  thumbnail: string;
  metadata: Metadata;
}

type OmitForCommon = 'reviews' | 'postedOn' | 'owner' | 'published';

type ListingSlim = Omit<Listing, OmitForCommon>;
type ListingFormProps = Omit<ListingCreateForm, 'thumbs'> & {
  thumbnail: string;
};
interface NewListingResponse {
  listingId: number;
}
export type { Listing, ListingCreateForm, NewListingResponse, ListingSlim, BedroomType, ListingCreateRequest, ListingFormProps, Availability, Viewer, Review, Bedroom, Address };
