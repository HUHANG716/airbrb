import React, { useState } from 'react';
import Search from 'antd/es/input/Search';
import styled from 'styled-components';
import { flexCenter } from '../../../styles/FlexStyle';
import { FilterOutlined } from '@ant-design/icons';
import { useSearch } from '../../../context/SearchContext/SearchContext';
import { useNavigate } from 'react-router-dom';
import { handleEnter, isDateEmpty } from '../../../utils/utils';
import dayjs from '../../../utils/dayjs';
import { useGlobalComponents } from '../../../context/GlobalComponentsContext/GlobalComponentsContext';
import FilterModal from './FilterModal';

const Wrapper = styled.div`
  ${flexCenter}
  width: 500px;
`;
const SearchInput = styled(Search)`
  padding: 0 0.5rem;
`;

const SearchBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { emitFilterSignal, setSearchParams, resetSearchParams, searchParams } = useSearch();
  const { notify } = useGlobalComponents();
  const nav2 = useNavigate();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    const { dateRange } = searchParams;
    console.log(dateRange);

    const [exist, after] = [!isDateEmpty(dateRange), dayjs(dateRange[0]).isAfter(dayjs(dateRange[1]), 'day')];
    if (exist && after) {
      notify.error('Start date should be before end date');
      return;
    }
    nav2('/');
    emitFilterSignal();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleReset = () => {
    resetSearchParams();
    setIsModalOpen(false);
    emitFilterSignal();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => ({
      ...prev,
      searchContent: e.target.value,
    }));
  };
  return (
    <Wrapper>
      <FilterModal
        onCancel={handleCancel}
        onOk={handleOk}
        onReset={handleReset}
        open={isModalOpen}
      />
      <SearchInput
        allowClear
        value={searchParams.searchContent}
        addonBefore={
          <FilterOutlined
            tabIndex={0}
            onKeyDown={(e) => handleEnter(e, showModal)}
            onClick={showModal}
          />
        }
        onChange={handleChange}
        placeholder='input search text'
        onSearch={handleOk}
      />
    </Wrapper>
  );
};

export default SearchBar;
