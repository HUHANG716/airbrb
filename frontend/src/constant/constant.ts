const BEDROOM_TYPES = ['Master', 'Standard', 'Single', 'Double', 'Twin', 'Suite', 'Children', 'Guest', 'Basement', 'Loft', 'Bunk', 'Other'];
const PLACE_TYPES = ['Apartment & Unit', 'House', 'Townhouse', 'Villa'];
const STORAGE_KEY_USER = 'user';
const SORT_BY_RATING = {
  HIGH_TO_LOW: 'High to Low',
  LOW_TO_HIGH: 'Low to High',
  DEFAULT: 'Default',
} as const;
const BOOKING_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  DECLINED: 'declined',
} as const;
export { BEDROOM_TYPES, PLACE_TYPES, STORAGE_KEY_USER, BOOKING_STATUS, SORT_BY_RATING };
