import React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import { DatePicker, Select, Slider } from 'antd';
import FilterForm from '../components/Layout/components/FilterForm';

import * as SearchContext from '../context/SearchContext/SearchContext'; // Import the module
import { Range } from '../types/global';

// Mock the module with jest.mock
jest.mock('../context/SearchContext/SearchContext', () => {
  // Create a mock setSearchParams function
  const setSearchParamsMock = jest.fn();
  // Return the original module mixed with the mocked hook
  return {
    ...jest.requireActual('../context/SearchContext/SearchContext'),
    useSearch: () => ({
      searchParams: {
        numBedroomsRange: [0, 10],
        priceRange: [0, 2000],
        dateRange: ['', ''],
        sortByRating: 'Default',
      },
      setSearchParams: setSearchParamsMock,
    }),
  };
});

describe('FilterForm', () => {
  let wrapper: ShallowWrapper;
  const { useSearch } = SearchContext;
  const setSearchParamsMock = useSearch().setSearchParams;

  beforeEach(() => {
    // Use mount to render FilterForm
    wrapper = shallow(<FilterForm />);
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
    onChange && onChange(NEW_VALUE);
    expect(setSearchParamsMock).toHaveBeenCalledWith(expect.objectContaining({ numBedroomsRange: NEW_VALUE }));
  });
  it('calls setSearchParams with correct value when price slider changes', () => {
    const priceSlider = wrapper.find(Slider).at(1);
    const NEW_VALUE: Range<number> = [100, 500];
    const onChange = priceSlider.props().onChange as (value: Range<number>) => void;
    onChange && onChange(NEW_VALUE);
    expect(setSearchParamsMock).toHaveBeenCalledWith(expect.objectContaining({ priceRange: NEW_VALUE }));
  });
  it('calls setSearchParams with correct value when date picker changes', () => {
    const startDatePicker = wrapper.find(DatePicker).at(0);
    const endDatePicker = wrapper.find(DatePicker).at(1);

    const [START, END] = ['10/10/2023', '10/11/2024'];

    startDatePicker.props()?.onChange(null, START);
    endDatePicker.props().onChange(null, END);

    expect(setSearchParamsMock).toHaveBeenNthCalledWith(1, expect.objectContaining({ dateRange: [START, ''] }));
    expect(setSearchParamsMock).toHaveBeenNthCalledWith(2, expect.objectContaining({ dateRange: ['', END] }));
  });

  it('calls setSearchParams with correct value when sort by changes', () => {
    const sortBySelect = wrapper.find(Select).at(0);
    const NEW_VALUE = 'HIGH TO LOW';
    const onChange = sortBySelect.props().onChange;
    // not in use
    const _ = {};
    onChange && onChange(NEW_VALUE, _);
    expect(setSearchParamsMock).toHaveBeenCalledWith(expect.objectContaining({ sortByRating: NEW_VALUE }));
  });
});
