import React, { useState } from 'react';
import Search from 'antd/es/input/Search';
import styled from 'styled-components';
import { flexCenter } from '../../../styles/FlexStyle';
import { Modal } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import FilterForm from './FilterForm';

const Wrapper = styled.div`
  ${flexCenter}
  width: 500px;
`;

// const SearchBarContext = createContext({});
const SearchBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    console.log(123);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Wrapper>
      <Modal title='Filter' onCancel={handleCancel} onOk={handleOk} open={isModalOpen}>
        <FilterForm />
      </Modal>
      <Search addonBefore={<FilterOutlined onClick={showModal} />} placeholder='input search text' onSearch={(value) => console.log(value)} />
    </Wrapper>
  );
};

export default SearchBar;
