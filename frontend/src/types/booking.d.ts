import { BOOKING_STATUS } from '../constant/constant';
import { Id } from './global';
import { Availability } from './listing';

type BookingStatus = (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS];
interface Booking {
  id: Id;
  owner: string;
  dateRange: Availability;
  totalPrice: number;
  listingId: Id;
  status: BookingStatus;
}

interface BookingsGetResponse {
  bookings: Booking[];
}
interface BookingsCreateRequest {
  totalPrice: number;
  dataRange: Availability;
}
export { Booking, BookingsGetResponse, BookingsCreateRequest, BookingStatus };
