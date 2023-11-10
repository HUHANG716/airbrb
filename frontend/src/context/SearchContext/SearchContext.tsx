/* disable-eslint */
import React, { createContext, useContext, useState } from 'react';
import { Range } from '../../types/global';
import { SORT_BY_RATING } from '../../constant/constant';

import { Listing } from '../../types/listing';
import { registerFilter } from './utils';
import { isDateEmpty } from '../../utils/utils';
import dayjs from '../../utils/dayjs';

export type RattingMethod = (typeof SORT_BY_RATING)[keyof typeof SORT_BY_RATING];
export interface SearchParams {
  searchContent: string;
  numBedroomsRange: Range<number>;
  priceRange: Range<number>;
  dateRange: Range<string>;
  sortByRating: (typeof SORT_BY_RATING)[keyof typeof SORT_BY_RATING];
}
interface SearchContextType {
  searchParams: SearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
  resetSearchParams: () => void;
  emitFilterSignal: () => void;
  signalForFilter: boolean;
  doFilter: (listings: Listing[], callback: (res: Listing[]) => void) => void;
}

export const BED_THRESHOLD = 10;
export const PRICE_THRESHOLD = 2000;
const initial: SearchContextType = {
  searchParams: {
    searchContent: '',
    numBedroomsRange: [0, BED_THRESHOLD],
    priceRange: [0, PRICE_THRESHOLD],
    dateRange: ['', ''],
    sortByRating: SORT_BY_RATING.DEFAULT,
  },

  resetSearchParams: () => {
    // init
  },
  emitFilterSignal: () => {
    // init
  },
  signalForFilter: false,
  setSearchParams: () => {
    // init
  },

  doFilter: () => {
    // init
    return [];
  },
};
const SearchContext = createContext(initial);

export const useSearch = () => useContext(SearchContext);
export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchParams, setSearchParams] = useState(initial.searchParams);
  const [signalForFilter, setSignalForFilter] = useState(false);

  const resetSearchParams = () => {
    setSearchParams({
      ...initial.searchParams,
    });
    setSignalForFilter(false);
  };
  const emitFilterSignal = () => {
    setSignalForFilter(true);
  };

  const doFilter: (listings: Listing[], callback: (res: Listing[]) => void) => void = (listings, callback) => {
    if (!signalForFilter) return;

    let result: Listing[] = [];
    const { numBedroomsRange, priceRange, searchContent, dateRange, sortByRating } = searchParams;
    const filter = registerFilter(listings);
    result = filter
      .filterBeds(numBedroomsRange, BED_THRESHOLD)
      .filterPrice(priceRange, PRICE_THRESHOLD)
      .filterTitle(searchContent, searchContent)
      .filterDate(dateRange, !isDateEmpty(dateRange))
      .sortByRating(sortByRating)
      .get();

    !isDateEmpty(dateRange) && (result = result.map((listing) => ({ ...listing, query: { dateRange, nights: dayjs(dateRange[1]).diff(dayjs(dateRange[0]), 'day') } })));
    setSignalForFilter(false);
    callback(result);
  };
  const ctx = {
    signalForFilter,
    searchParams,
    emitFilterSignal,
    setSearchParams,
    resetSearchParams,
    doFilter,
  };
  return <SearchContext.Provider value={ctx}>{children}</SearchContext.Provider>;
};
