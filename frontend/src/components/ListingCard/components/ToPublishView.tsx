import { Button, DatePicker, Flex } from 'antd';
import React, { useState } from 'react';
import { useHosted } from '../../../context/HostedContext/HostedContext';
import { useGlobalComponents } from '../../../context/GlobalComponentsContext/GlobalComponentsContext';
import { Availability } from '../../../types/listing';
import apiReq from '../../../utils/apiReq';
import styled from 'styled-components';
import { useListingCard } from '../ListingCard';
import { nanoid } from 'nanoid';
import dayjs from '../../../utils/dayjs';

const ViewButtonWrapper = styled(Button)`
  width: 6rem;
  margin: auto;
`;

const OperationButton = ({ add, operations }: { add: boolean; operations: [() => void, () => void] }) => {
  const { handleClick, text } = add
    ? {
        handleClick: operations[0],
        text: '+',
      }
    : {
        handleClick: operations[1],
        text: '-',
      };

  return (
    <Button
      onClick={handleClick}
      shape='circle'>
      {text}
    </Button>
  );
};
const ToPublishView = () => {
  const { notify } = useGlobalComponents();
  const { reloadHosted } = useHosted();
  const { id } = useListingCard();
  const [dates, setDates] = useState([{ start: '', end: '' }]);
  const isValidate = (dates: Availability[]) => {
    return dates.every((date) => date.start && date.end);
  };

  const handleSubmit = async (dates: Availability[]) => {
    try {
      await apiReq.put(`/listings/publish/${id}`, {
        availability: dates,
      });
      reloadHosted();
      notify.success('Listing published');
    } catch (err) {
      notify.error(err as string);
    }
  };
  const addDateRange = () => {
    setDates([...dates, { start: '', end: '' }]);
  };

  // 移除日期范围
  const removeDateRange = (index: number) => {
    const newDates = dates.filter((_, i) => i !== index);
    setDates(newDates);
  };

  // 更新日期范围
  const updateDateRange = (index: number, start: string, end: string) => {
    const newDates = [...dates];
    newDates[index] = { start, end };
    setDates(newDates);
  };
  return (
    <Flex
      vertical
      gap={'small'}>
      {dates.map((dateRange, index) => (
        <Flex
          gap={'small'}
          key={nanoid()}>
          <DatePicker
            placeholder='Start'
            value={dateRange.start ? dayjs(dateRange.start) : null}
            format={'DD/MM/YYYY'}
            onChange={(_, dateString) => updateDateRange(index, dateString, dateRange.end)}
          />

          <DatePicker
            placeholder='End'
            value={dateRange.end ? dayjs(dateRange.end) : null}
            format={'DD/MM/YYYY'}
            onChange={(_, dateString) => updateDateRange(index, dateRange.start, dateString)}
          />
          <OperationButton
            add={index === dates.length - 1}
            operations={[addDateRange, () => removeDateRange(index)]}
          />
        </Flex>
      ))}
      <ViewButtonWrapper
        disabled={!isValidate(dates)}
        type='primary'
        size='small'
        onClick={() => handleSubmit(dates)}>
        Publish
      </ViewButtonWrapper>
    </Flex>
  );
};

export default ToPublishView;
