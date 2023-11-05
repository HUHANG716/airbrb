import { Button, DatePicker, Flex, Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { Dayjs } from 'dayjs';
import React from 'react';
import { useHosted } from '../../../pages/Hosted/context/HostedContext';
import { useGlobalComponents } from '../../../context/GlobalComponentsContext/GlobalComponentsContext';
import { Availability } from '../../../types/listing';

import apiReq from '../../../utils/apiReq';
import FormItem from 'antd/es/form/FormItem';
import styled from 'styled-components';
import { useListingCard } from '../ListingCard';

type Dates = [Dayjs, Dayjs];

const ViewButtonWrapper = styled(Button)`
  width: 6rem;
  margin: auto;
`;
const datePreprocess = (dates: Dates[]) => {
  return dates.map(([start, end]) => {
    return { start: start.format('DD/MM/YYYY'), end: end.format('DD/MM/YYYY') };
  });
};
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
    <Button onClick={handleClick} style={{ marginLeft: '0.5rem' }} shape='circle'>
      {text}
    </Button>
  );
};
const ToPublishView = () => {
  const [form] = useForm();
  const { notify } = useGlobalComponents();
  const { getOneListing, reloadHosted } = useHosted();
  const { id } = useListingCard();
  const handleSubmit = async (dates: Availability[]) => {
    console.log(getOneListing(id));
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

  return (
    <Form
      form={form}
      onFinish={() => {
        const dates = datePreprocess(form.getFieldValue('dates'));
        handleSubmit(dates);
      }}>
      <Form.List initialValue={[[]]} name='dates'>
        {(fields, { add, remove }) => (
          <Flex vertical>
            {fields.map((field, index) => (
              <FormItem key={field.key}>
                <FormItem
                  {...field}
                  rules={[
                    {
                      required: true,
                      message: 'Missing date',
                    },
                  ]}
                  validateTrigger={['onChange', 'onBlur']}
                  noStyle>
                  <DatePicker.RangePicker format={'DD/MM/YYYY'} />
                </FormItem>
                <OperationButton add={index === fields.length - 1} operations={[add, () => remove(field.name)]} />
              </FormItem>
            ))}
            <ViewButtonWrapper type='primary' size='small' htmlType='submit'>
              Publish
            </ViewButtonWrapper>
          </Flex>
        )}
      </Form.List>
    </Form>
  );
};

export default ToPublishView;
