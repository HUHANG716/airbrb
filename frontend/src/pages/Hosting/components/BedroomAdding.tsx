import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Flex, InputNumber, Select } from 'antd';
import styled from 'styled-components';
import { List } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import { BEDROOM_TYPES } from '../../../constant/constant';

import { FullWidthItem } from '../../../components/ListingForm/ListingForm';

const InputNum = styled(InputNumber)`
  width: 5rem;
  margin-left: 1rem;
`;

const Text = styled.div`
  text-transform: capitalize;
`;
const Option = styled(Select.Option)`
  width: 8rem;
`;

const BedroomAdding = () => {
  const Options = BEDROOM_TYPES.map((type) => (
    <Option key={type} value={type}>
      <Text> {type}</Text>
    </Option>
  ));

  return (
    <FullWidthItem label='Bedrooms'>
      <List name='bedrooms'>
        {(subFields, subOpt) => (
          <Flex gap='small' vertical>
            {subFields.map((subField) => (
              <Flex justify='space-between' gap={'small'} key={subField.key}>
                <Flex gap={'small'}>
                  <FormItem
                    rules={[
                      () => ({
                        validator: (_, value) => {
                          return value ? Promise.resolve() : Promise.reject(new Error('Please input a valid type!'));
                        },
                      }),
                    ]}
                    name={[subField.name, 'type']}>
                    <Select
                      style={{
                        width: '8rem',
                      }}
                      placeholder='Bed Type'>
                      {Options}
                    </Select>
                  </FormItem>
                  <FormItem
                    rules={[
                      () => ({
                        validator: (_, value) => {
                          return value > 0 ? Promise.resolve() : Promise.reject(new Error('Please input a valid number!'));
                        },
                      }),
                    ]}
                    name={[subField.name, 'num']}
                    required
                    initialValue={subField.name}>
                    <InputNum placeholder='Beds' />
                  </FormItem>
                </Flex>
                <CloseOutlined
                  onClick={() => {
                    subOpt.remove(subField.name);
                  }}
                />
              </Flex>
            ))}
            <Button type='dashed' onClick={() => subOpt.add()} block>
              + Add Bedroom
            </Button>
          </Flex>
        )}
      </List>
    </FullWidthItem>
  );
};
export default BedroomAdding;
