import React, { useMemo } from 'react';
import { Slider, DatePicker, Select, Flex, Space, Button } from 'antd';
import { SearchParams, useSearch } from '../../../context/SearchContext/SearchContext';
import { SORT_BY_RATING } from '../../../constant/constant';
import { Range } from '../../../types/global';
import dayjs, { Dayjs } from '../../../utils/dayjs';

const FilterForm = ({ searchParams, setSearchParams }: { searchParams: SearchParams; setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>> }) => {
  const { Option } = Select;
  const { dateRange } = searchParams;
  const [start, end] = dateRange.map((date) => (date ? dayjs(date) : undefined));

  const { priceRange, sortByRating } = searchParams;
  return (
    <Flex
      vertical
      gap={'small'}>
      Beds
      <Slider
        id='bedroom-slider'
        value={searchParams.numBedroomsRange}
        onChange={(value) => {
          setSearchParams({
            ...searchParams,
            numBedroomsRange: value as Range<number>,
          });
        }}
        marks={{
          0: '0',
          5: '5',
          10: '10+',
        }}
        max={10}
        range
        step={1}
      />
      Price
      <Slider
        data-testid='price-slider'
        value={priceRange}
        onChange={(value) => {
          setSearchParams({
            ...searchParams,
            priceRange: value as Range<number>,
          });
        }}
        marks={{
          0: '0',
          2000: '2000+',
          1000: '1000',
        }}
        max={2000}
        range
        step={100}
      />
      Date Range
      <Space>
        <DatePicker
          data-testid='start-date-picker'
          value={start as Dayjs}
          onChange={(_, value) => {
            setSearchParams({
              ...searchParams,
              dateRange: [value, dateRange[1]],
            });
          }}
          format={'DD/MM/YYYY'}
        />
        <DatePicker
          data-testid='end-date-picker'
          value={end as Dayjs}
          onChange={(_, value) => {
            setSearchParams({
              ...searchParams,
              dateRange: [dateRange[0], value],
            });
          }}
          format={'DD/MM/YYYY'}
        />
      </Space>
      Sort By
      <Select
        onChange={(value) =>
          setSearchParams({
            ...searchParams,
            sortByRating: value,
          })
        }
        value={sortByRating}>
        <Option value={SORT_BY_RATING.DEFAULT}>Default</Option>
        <Option value={SORT_BY_RATING.HIGH_TO_LOW}>High to Low</Option>
        <Option value={SORT_BY_RATING.LOW_TO_HIGH}> Low to High</Option>
      </Select>
    </Flex>
  );
};

export default FilterForm;
