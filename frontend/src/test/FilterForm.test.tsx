import React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import { DatePicker, Select, Slider } from 'antd';
import FilterForm from '../components/Layout/components/FilterForm';

import { Range } from '../types/global';
import dayjs from '../utils/dayjs';
import { SearchParams } from '../context/SearchContext/SearchContext';

describe('FilterForm', () => {
  let wrapper: ShallowWrapper;
  const searchParamsMock: SearchParams = {
    searchContent: '',
    numBedroomsRange: [0, 10],
    priceRange: [0, 2000],
    dateRange: ['', ''],
    sortByRating: 'Default',
  };
  const setSearchParamsMock = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <FilterForm
        searchParams={searchParamsMock}
        setSearchParams={setSearchParamsMock}
      />
    );
  });

  it('renders properly', () => {
    expect(wrapper.find(Slider)).toHaveLength(2);
    expect(wrapper.find(DatePicker)).toHaveLength(2);
    expect(wrapper.find(Select)).toHaveLength(1);
  });

  it('calls setSearchParams with correct value when bedroom slider changes', () => {
    const bedroomSlider = wrapper.find(Slider).at(0);
    const NEW_VALUE: Range<number> = [2, 5];
    const onChange = bedroomSlider.props().onChange as (value: Range<number>) => void;
    onChange(NEW_VALUE);
    // should called with correct params
    expect(setSearchParamsMock).toHaveBeenCalledWith(expect.objectContaining({ numBedroomsRange: NEW_VALUE }));
  });
  it('calls setSearchParams with correct value when price slider changes', () => {
    const priceSlider = wrapper.find(Slider).at(1);
    const NEW_VALUE: Range<number> = [100, 500];
    const onChange = priceSlider.props().onChange as (value: Range<number>) => void;
    onChange && onChange(NEW_VALUE);
    // should called with correct params
    expect(setSearchParamsMock).toHaveBeenCalledWith(expect.objectContaining({ priceRange: NEW_VALUE }));
  });
  it('calls setSearchParams with correct value when date picker changes', () => {
    const startDatePicker = wrapper.find(DatePicker).at(0);
    const endDatePicker = wrapper.find(DatePicker).at(1);

    const [START, END] = ['10/10/2023', '10/11/2024'];

    startDatePicker.props().onChange(null, START);
    endDatePicker.props().onChange(null, END);
    // should called with correct params
    expect(setSearchParamsMock).toHaveBeenNthCalledWith(1, expect.objectContaining({ dateRange: [START, ''] }));
    expect(setSearchParamsMock).toHaveBeenNthCalledWith(2, expect.objectContaining({ dateRange: ['', END] }));
  });
  it('should correctly display the date', () => {
    const [start, end] = ['09/11/2024', '10/11/2024'];
    wrapper = shallow(
      <FilterForm
        searchParams={{
          ...searchParamsMock,
          dateRange: [start, end],
        }}
        setSearchParams={setSearchParamsMock}
      />
    );
    // should feed correct value to date picker
    expect(wrapper.find(DatePicker).at(0).props().value).toEqual(dayjs(start));
    expect(wrapper.find(DatePicker).at(1).props().value).toEqual(dayjs(end));
  });
  it('should correctly display the date', () => {
    wrapper = shallow(
      <FilterForm
        searchParams={{
          searchContent: '',
          numBedroomsRange: [0, 10],
          priceRange: [0, 2000],
          dateRange: ['', ''],
          sortByRating: 'Default',
        }}
        setSearchParams={setSearchParamsMock}
      />
    );
    const startDatePicker = wrapper.find(DatePicker).at(0);
    // should feed correct value(undefined when '') to date picker
    expect(startDatePicker.props().value).toBe(undefined);
    expect(wrapper.find(DatePicker).at(1).props().value).toBe(undefined);
  });
  it('calls setSearchParams with correct value when rating ranked type changed', () => {
    const sortBySelect = wrapper.find(Select).at(0);
    const NEW_VALUE = 'HIGH TO LOW';
    const onChange = sortBySelect.props().onChange;
    // not in use
    const _ = {};
    onChange && onChange(NEW_VALUE, _);
    // should called with correct params
    expect(setSearchParamsMock).toHaveBeenCalledWith(expect.objectContaining({ sortByRating: NEW_VALUE }));
  });
});
