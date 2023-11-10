import { Bedroom, Listing, Review } from '../types/listing';
import { Range } from '../types/global';
import dayjs from './dayjs';
import React from 'react';
const lsSave = (key: string, target: unknown) => {
  localStorage.setItem(key, JSON.stringify(target));
};
const lsGet = (key: string) => {
  const item = localStorage.getItem(key);

  return item ? JSON.parse(item) : null;
};
const lsRm = (key: string) => {
  localStorage.removeItem(key);
};
const isEquivalent = (a: string | number, b: string | number) => {
  return a.toString() === b.toString();
};
const sortByAlphabet = <T>(items: T[], key: (item: T) => string) => {
  return items.sort((a, b) => {
    const aKey = key(a);
    const bKey = key(b);

    return aKey.localeCompare(bKey);
  });
};

const calcRating = (reviews: Review[]) => {
  const rating = reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length || 0;
  return rating.toFixed(1);
};

const calcBedsNum = (bedrooms: Bedroom[]) => {
  const numBeds = bedrooms.reduce((acc, cur) => acc + cur.num, 0);
  return numBeds;
};
const processListing = (listing: Listing) => {
  const { id, title, thumbnail, price, metadata, reviews, published } = listing;
  const { bedrooms = [], propertyType, numBathrooms } = metadata;
  const numBeds = calcBedsNum(bedrooms);
  const rating = calcRating(reviews);
  const numReviews = reviews.length;
  const result = {
    title,
    thumbnail,
    price,
    propertyType,
    numBeds,
    numBathrooms,
    rating,
    numReviews,
    id,
    published,
  };
  return result;
};

const diffDays = (date1: string, date2: string) => {
  const day1 = dayjs(date1);
  const day2 = dayjs(date2);
  return day2.diff(day1, 'day');
};
const getBase64 = (file: File | Blob) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
const nItem = (n: number, item: string) => {
  return n === 1 ? `${n} ${item}` : `${n} ${item}s`;
};
const isDateEmpty = (date: Range<string>) => {
  const [min, max] = date;
  return min === '' && max === '';
};
const handleEnter = (e: React.KeyboardEvent<HTMLElement>, fn: () => void) => {
  e.key === 'Enter' && fn();
};
export { lsSave, lsGet, lsRm, isEquivalent, sortByAlphabet, processListing, calcRating, calcBedsNum, getBase64, diffDays, nItem, isDateEmpty, handleEnter };
