import { Button, Divider, Form as _Form, Input, Radio, Select } from 'antd';
import React from 'react';
import { PLACE_TYPES } from '../../constant/constant';
import BathroomAdding from '../../pages/Hosting/components/BathroomAdding';
import BedroomAdding from '../../pages/Hosting/components/BedroomAdding';
import ThumbUpload from '../../pages/Hosting/components/ThumbUpload';
import { FormInstance, useWatch } from 'antd/es/form/Form';
import { ListingCreateForm } from '../../types/listing';
import styled from 'styled-components';
import FormItem from 'antd/es/form/FormItem';

const Form = styled(_Form)`
  width: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const FullWidthItem = styled(FormItem)`
  width: 100%;
`;
type Props = {
  initialValues?: ListingCreateForm;
  form: FormInstance<ListingCreateForm>;
  handleFinish: () => void;
};
const ListingForm = ({ form, handleFinish }: Props) => {
  const count = useWatch('numBathrooms', form);
  const thumbFiles = useWatch('thumbs', form);
  return (
    <Form
      initialValues={{
        numBathrooms: 0,
        bedrooms: [
          {
            numBedrooms: 0,
            beds: [],
          },
        ],
        propertyType: PLACE_TYPES[0],
      }}
      scrollToFirstError
      onFinish={handleFinish}
      form={form}
      layout='vertical'>
      <FullWidthItem
        required
        style={{
          width: '100%',
        }}
        name='propertyType'
        label='What type of property do you have?'>
        <Radio.Group>
          {PLACE_TYPES.map((option) => (
            <Radio key={option} value={option}>
              {option}
            </Radio>
          ))}
        </Radio.Group>
      </FullWidthItem>
      <FullWidthItem
        rules={[
          {
            required: true,
          },
        ]}
        name='title'
        label='Title'>
        <Input />
      </FullWidthItem>
      <FullWidthItem
        rules={[
          {
            required: true,
          },
        ]}
        name='address'
        label='Address'>
        <Input />
      </FullWidthItem>
      {/* Detail */}
      <Divider>Detail</Divider>
      <BathroomAdding count={count} setCount={(value) => form.setFieldValue('numBathrooms', value)} />
      <BedroomAdding />
      <FullWidthItem name='amenities' label='Property amenities'>
        <Select mode='tags' placeholder='Property amenities' />
      </FullWidthItem>
      {/* Pictures Upload */}
      <ThumbUpload thumbFiles={thumbFiles} />
      {/* Price */}
      <Divider>Price</Divider>
      <FullWidthItem
        name='price'
        label='Price (per night)'
        rules={[
          {
            required: true,
          },
        ]}>
        <Input />
      </FullWidthItem>
      <FullWidthItem>
        <Button htmlType='submit' type='primary'>
          Submit
        </Button>
      </FullWidthItem>
    </Form>
  );
};

export default ListingForm;
