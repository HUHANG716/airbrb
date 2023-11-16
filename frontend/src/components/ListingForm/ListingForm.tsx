import { Button, Divider, Form as _Form, Input, Radio, Select, FormInstance, Flex } from 'antd';
import React from 'react';
import { PLACE_TYPES } from '../../constant/constant';
import BathroomAdding from './components/BathroomAdding';
import BedroomAdding from './components/BedroomAdding';
import ThumbUpload from './components/ThumbUpload';

import { ListingCreateForm } from '../../types/listing';
import styled from 'styled-components';

import { CommonContentWrapper } from '../../styles/GlobalStyle';
import AddressInput from './components/AddressInput';
const { useWatch } = _Form;
const Form = styled(_Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const FullWidthItem = styled(Form.Item)`
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
    <CommonContentWrapper>
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
        onSubmitCapture={(e) => {
          console.log(form.getFieldsValue());
          e.preventDefault();
        }}
        form={form}
        layout='vertical'>
        <FullWidthItem
          required
          name='propertyType'
          label='What type of property do you have?'>
          <Radio.Group size='small'>
            {PLACE_TYPES.map((option) => (
              <Radio
                key={option}
                value={option}>
                {option}
              </Radio>
            ))}
          </Radio.Group>
        </FullWidthItem>
        <FullWidthItem
          required
          rules={[
            {
              required: true,
            },
          ]}
          name='title'
          label='Title'>
          <Input />
        </FullWidthItem>
        {/* Address */}
        <AddressInput />
        {/* Detail */}
        <Divider>Detail</Divider>
        <BathroomAdding
          count={count}
          setCount={(value) => form.setFieldValue('numBathrooms', value)}
        />
        <BedroomAdding />
        <FullWidthItem
          name='amenities'
          label='Property amenities'>
          <Select
            mode='tags'
            placeholder='Property amenities'
          />
        </FullWidthItem>
        {/* Pictures Upload */}
        <ThumbUpload
          thumbFiles={thumbFiles}
          form={form}
        />
        {/* Price */}
        <Divider>Price</Divider>
        <FullWidthItem
          required
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
          <Button
            htmlType='submit'
            type='primary'>
            Submit
          </Button>
        </FullWidthItem>
      </Form>
    </CommonContentWrapper>
  );
};

export default ListingForm;
