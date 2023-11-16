import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Flex, Form, InputNumber, Select } from 'antd';
import styled from 'styled-components';
import { BEDROOM_TYPES } from '../../../constant/constant';
import { FullWidthItem } from '../ListingForm';
import { handleEnter } from '../../../utils/utils';

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
const { List, Item: FormItem } = Form;
const BedroomAdding = () => {
  const Options = BEDROOM_TYPES.map((type) => (
    <Option
      key={type}
      value={type}>
      <Text> {type}</Text>
    </Option>
  ));

  return (
    <FullWidthItem label='Bedrooms'>
      <List name='bedrooms'>
        {(subFields, subOpt) => (
          <Flex
            gap='small'
            vertical>
            {subFields.map((subField) => (
              <Flex
                justify='space-between'
                gap={'small'}
                key={subField.key}>
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
                      placeholder='Type'>
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
                    initialValue={0}>
                    <InputNum placeholder='Beds' />
                  </FormItem>
                  <FormItem>
                    <CloseOutlined
                      tabIndex={0}
                      onKeyDown={(e) => handleEnter(e, () => subOpt.remove(subField.name))}
                      onClick={() => {
                        subOpt.remove(subField.name);
                      }}
                    />
                  </FormItem>
                </Flex>
              </Flex>
            ))}
            <Button
              type='dashed'
              onClick={() => subOpt.add()}
              block>
              + Add Bedroom
            </Button>
          </Flex>
        )}
      </List>
    </FullWidthItem>
  );
};
export default BedroomAdding;
