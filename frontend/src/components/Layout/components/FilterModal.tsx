import React from 'react';
import { useSearch } from '../../../context/SearchContext/SearchContext';
import { Button, Modal, Space } from 'antd';
import FilterForm from './FilterForm';

type Props = {
  onCancel: () => void;
  onOk: () => void;
  onReset: () => void;
  open: boolean;
};

const FilterModal = ({ onCancel, onOk, onReset, open }: Props) => {
  const { setSearchParams, searchParams } = useSearch();
  return (
    <Modal
      title='Filter'
      onCancel={onCancel}
      footer={
        <Space>
          <Button onClick={onReset}>Reset</Button>
          <Button
            onClick={onOk}
            type='primary'>
            OK
          </Button>
        </Space>
      }
      open={open}>
      <FilterForm
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </Modal>
  );
};

export default FilterModal;
