import React from 'react';
import { Form, Slider, DatePicker, Select } from 'antd';
const FilterForm = () => {
  const { Item } = Form;
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  return (
    <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} layout='vertical'>
      <Item label='Bedrooms'>
        <Slider
          marks={{
            0: '0',
            5: '5',
            10: '10+',
          }}
          max={10}
          range
          step={1}
          defaultValue={[0, 10]}
        />
      </Item>
      <Item label='Price'>
        <Slider
          marks={{
            0: '0',
            2000: '2000+',
            1000: '1000',
          }}
          max={2000}
          range
          step={100}
          defaultValue={[0, 2000]}
        />
      </Item>
      <Item label='Date'>
        <RangePicker />
      </Item>
      <Item label='Sort by Review Ratings'>
        <Select>
          <Option>1</Option>
          <Option>2</Option>
        </Select>
      </Item>
    </Form>
  );
};

export default FilterForm;
