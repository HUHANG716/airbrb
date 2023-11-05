import { BEDROOM_TYPE, PLACE_TYPES } from '../constant/constant';
import { Id, Img } from './global';
import { UploadChangeParam } from 'antd/es/upload';

interface Address {
  address: string;
}
interface Availability {
  start: string;
  end: string;
}
type BedroomType = (typeof BEDROOM_TYPE)[number];
type PlaceType = (typeof PLACE_TYPES)[number];
type Viewer = 'owner' | 'common';
interface bedroom {
  type: BedroomType;
  num: number;
}
interface Metadata {
  bedrooms: bedroom[];
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
}
interface ListingCreateForm extends Omit<Metadata, 'otherPictures'> {
  title: string;
  address: string;
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
type ListingFormProps = Omit<ListingCreateForm, 'thumbs'> & { thumbnail: string };
interface NewListingResponse {
  listingId: number;
}
export type { Listing, ListingCreateForm, NewListingResponse, ListingSlim, BedroomType, ListingCreateRequest, ListingFormProps, Availability, Viewer };
