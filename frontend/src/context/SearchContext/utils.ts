import { SORT_BY_RATING } from '../../constant/constant';
import { Range } from '../../types/global';
import { Listing } from '../../types/listing';
import dayjs from '../../utils/dayjs';
import { calcBedsNum, calcRating, isDigit } from '../../utils/utils';
import { RattingMethod } from './SearchContext';

type FilterBeds = (listing: Listing[], beds: Range<number>, threshold: number) => Listing[];
type FilterPrice = (listing: Listing[], price: Range<number>, threshold: number) => Listing[];
type FilterSearchContent = (listing: Listing[], SearchContent: string) => Listing[];
type FilterDate = (listing: Listing[], date: Range<string>) => Listing[];
const filterBeds: FilterBeds = (listing, beds, threshold) => {
  let [min, max] = beds;
  max >= threshold && (max = Number.MAX_SAFE_INTEGER);
  return listing.filter((item) => {
    const numBeds = calcBedsNum(item.metadata.bedrooms);
    return numBeds >= min && numBeds <= max;
  });
};

const filterPrice: FilterPrice = (listing, price, threshold) => {
  let [min, max] = price;
  max >= threshold && (max = Number.MAX_SAFE_INTEGER);
  return listing.filter((item) => {
    return item.price >= min && item.price <= max;
  });
};

const filterSearchContent: FilterSearchContent = (listing, content) => {
  return listing.filter((item) => {
    if (item.address.city.toLowerCase().includes(content.toLowerCase())) return true;
    if (item.address.street.toLowerCase().includes(content.toLowerCase())) return true;
    return false;
  });
};

const filterDate: FilterDate = (listing, date) => {
  const [min, max] = date;
  const dayjsMin = dayjs(min);
  const dayjsMax = dayjs(max);

  return listing.filter(({ availability }) => {
    const dayjsAvails = availability.map(({ start, end }) => [dayjs(start), dayjs(end)]);
    return dayjsAvails.some(([start, end]) => dayjsMin.isBetween(start, end, null, '[]') && dayjsMax.isBetween(start, end, null, '[]'));
  });
};
type SortByRating = (listing: Listing[], sortBy: RattingMethod) => Listing[];
const sortByRating: SortByRating = (listing, sortBy) => {
  if (sortBy === SORT_BY_RATING.DEFAULT) return listing;
  return listing.sort((a, b) => {
    const { reviews: reviewsA } = a;
    const { reviews: reviewsB } = b;
    const ratingResA = calcRating(reviewsA);
    const ratingResB = calcRating(reviewsB);
    let ratingA = isDigit(ratingResA) ? ratingResA : 0;
    let ratingB = isDigit(ratingResB) ? ratingResB : 0;
    ratingA = Number(ratingA);
    ratingB = Number(ratingB);
    if (sortBy === SORT_BY_RATING.HIGH_TO_LOW) {
      return ratingB - ratingA;
    }

    return ratingA - ratingB;
  });
};
const registerFilter = (listing: Listing[]) => {
  return {
    get: () => listing,
    filterBeds: (beds: Range<number>, threshold: number) => registerFilter(filterBeds(listing, beds, threshold)),
    filterPrice: (price: Range<number>, threshold: number) => registerFilter(filterPrice(listing, price, threshold)),
    filterSearchContent: (title: string, condition?: unknown) => (condition ? registerFilter(filterSearchContent(listing, title)) : registerFilter(listing)),
    filterDate: (date: Range<string>, condition?: unknown) => (condition ? registerFilter(filterDate(listing, date)) : registerFilter(listing)),
    sortByRating: (sortBy: RattingMethod) => registerFilter(sortByRating(listing, sortBy)),
  };
};

export { registerFilter };
