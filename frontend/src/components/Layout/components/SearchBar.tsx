import React, { useState } from 'react';
import Search from 'antd/es/input/Search';
import styled from 'styled-components';
import { flexCenter } from '../../../styles/FlexStyle';
import { Button, Modal, Space } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import FilterForm from './FilterForm';
import { useSearch } from '../../../context/SearchContext/SearchContext';
import { useNavigate } from 'react-router-dom';
import { handleEnter, isDateEmpty } from '../../../utils/utils';
import dayjs from '../../../utils/dayjs';
import { useGlobalComponents } from '../../../context/GlobalComponentsContext/GlobalComponentsContext';

const Wrapper = styled.div`
  ${flexCenter}
  width: 500px;
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
  return (
    <Wrapper>
      <Modal
        title='Filter'
        onCancel={handleCancel}
        footer={
          <Space>
            <Button onClick={handleReset}>Reset</Button>
            <Button
              onClick={handleOk}
              type='primary'>
              OK
            </Button>
          </Space>
        }
        open={isModalOpen}>
        <FilterForm />
      </Modal>
      <Search
        allowClear
        value={searchParams.searchContent}
        addonBefore={
          <FilterOutlined
            tabIndex={0}
            onKeyDown={(e) => handleEnter(e, showModal)}
            onClick={showModal}
          />
        }
        onChange={(e) =>
          setSearchParams((prev) => ({
            ...prev,
            searchContent: e.target.value,
          }))
        }
        placeholder='input search text'
        onSearch={handleOk}
      />
    </Wrapper>
  );
};

export default SearchBar;
