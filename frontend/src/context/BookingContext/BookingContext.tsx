import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import apiReq from '../../utils/apiReq';
import { Booking, BookingsGetResponse } from '../../types/booking';
import { useGlobalComponents } from '../GlobalComponentsContext/GlobalComponentsContext';
import { Id } from '../../types/global';
import { useUser } from '../UserContext/UserContext';

import { isEquivalent } from '../../utils/utils';

interface BookingContextType {
  bookings: Booking[];
  bookingsMy: Booking[];

  getBookingsMyOfListing: (id: Id) => Booking[];
  getBookingsOfListing: (id: Id) => Booking[];
  requestBookings: () => Promise<Booking[]>;
}

const BookingContext = createContext<BookingContextType>({
  bookings: [],
  bookingsMy: [],
  getBookingsMyOfListing: () => {
    // init
    return [];
  },
  getBookingsOfListing: () => {
    // init
    return [];
  },
  requestBookings: () => {
    // init
    return Promise.resolve([]);
  },
});

const useBooking = () => useContext<BookingContextType>(BookingContext);

const BookingProvider = ({ children }: { children: React.ReactNode }) => {
  const { notify } = useGlobalComponents();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { userInfo } = useUser();

  const bookingsMy = useMemo(
    () => bookings.filter((booking) => booking.owner === userInfo?.email),
    [bookings, userInfo]
  );
  const requestBookings = async (): Promise<Booking[]> => {
    let res: Booking[] = [];
    try {
      const response = await apiReq.get<BookingsGetResponse>('/bookings');
      res = response.data.bookings;
      setBookings(res);
    } catch (err) {
      notify.error(err as string);
    }
    return res;
  };
  const getBookingsOfListing = (id: Id) =>
    bookings.filter((booking) => isEquivalent(booking.listingId, id));
  const getBookingsMyOfListing = (id: Id) =>
    bookingsMy.filter((booking) => isEquivalent(booking.listingId, id));
  useEffect(() => {
    userInfo && requestBookings();
    !userInfo && setBookings([]);
  }, [userInfo]);
  const ctx = {
    bookings,
    bookingsMy,
    getBookingsMyOfListing,
    getBookingsOfListing,
    requestBookings,
  };
  return (
    <BookingContext.Provider value={ctx}>{children}</BookingContext.Provider>
  );
};
export { BookingProvider, useBooking };
