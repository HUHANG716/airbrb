import { Button, Flex, Form, FormInstance, Input } from 'antd';

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
  form?: FormInstance;
  onFinish: () => void;
  disabled?: boolean;
};
const LoginLink = styled(Link)`
  margin-top: 20px;
`;

const RegistrationForm = (props: Props) => (
  <Form
    {...props}
    layout='vertical'>
    <Flex vertical>
      <Form.Item
        required
        name='email'
        label='Email'
        rules={[{ required: true, message: 'Please input your email!' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label='name'
        name='name'
        required
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        label='Password'
        name='password'
        required
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}>
        <Input.Password />
      </Form.Item>
      <Form.Item
        required
        label='Confirm Password'
        name='confirmPassword'
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          ({ getFieldValue }) => ({
            validator: (_, value) => {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}>
        <Input.Password />
      </Form.Item>

      <Button
        type='primary'
        htmlType='submit'>
        Sign Up
      </Button>
      <LoginLink to='/login'>Already have an account? Log in here!</LoginLink>
    </Flex>
  </Form>
);

export default RegistrationForm;
