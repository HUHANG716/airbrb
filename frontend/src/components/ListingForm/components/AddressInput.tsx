import { Flex, Form, Input } from 'antd';
import React from 'react';
import { FullWidthItem } from '../ListingForm';

const AddressInput = () => {
  return (
    <FullWidthItem
      required
      label='Address'>
      <Flex
        gap={'small'}
        justify='center'>
        <Form.Item
          required
          rules={[
            {
              required: true,
            },
          ]}
          name={'city'}
          style={{
            width: '45%',
          }}>
          <Input
            aria-label='city'
            placeholder='City'
          />
        </Form.Item>
        <Form.Item
          required
          rules={[
            {
              required: true,
            },
          ]}
          style={{
            width: '100%',
          }}
          name={'street'}>
          <Input
            aria-label='Street'
            placeholder='Street'></Input>
        </Form.Item>
      </Flex>
    </FullWidthItem>
  );
};

export default AddressInput;
