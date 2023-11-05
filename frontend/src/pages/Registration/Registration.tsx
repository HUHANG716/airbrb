/** @format */

import { Form as _Form, Input, Flex, Button } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import _Card from 'antd/es/card/Card';
import { AuthResponse, UserRegisterForm } from '../../types/user';
import apiReq from '../../utils/apiReq';
import { Link } from '../Login/Login';
import { useNavigate } from 'react-router-dom';
import { useGlobalComponents } from '../../context/GlobalComponentsContext/GlobalComponentsContext';
import { useUser } from '../../context/UserContext/UserContext';

const { Item } = _Form;

export const Form = styled(_Form)`
  width: 100%;
`;
export const Card = styled(_Card)`
  text-align: center;
  width: 400px;
`;

const Registration = () => {
  const [form] = Form.useForm<UserRegisterForm>();
  const { notify } = useGlobalComponents();
  const [disabled, setDisabled] = useState(false);
  const { login } = useUser();
  const nav2 = useNavigate();
  const handleFinish = async () => {
    const { email, name, password } = form.getFieldsValue();
    setDisabled(true);
    try {
      const res = await apiReq.post<AuthResponse>('/user/auth/register', { email, name, password });
      login({
        email,
        token: res.data.token,
      });
      notify.success('Sign up successfully!');
      nav2('/');
    } catch (err) {
      notify.error(err as string);
      setDisabled(false);
    }
  };
  return (
    <Card title='Sign Up'>
      <Form disabled={disabled} form={form} onFinish={handleFinish} layout='vertical'>
        <Flex vertical>
          <Item name='email' label='Email' rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input />
          </Item>
          <Item
            label='name'
            name='name'
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}>
            <Input />
          </Item>
          <Item
            label='Password'
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}>
            <Input.Password />
          </Item>
          <Item
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
          </Item>

          <Button type='primary' htmlType='submit'>
            Sign Up
          </Button>
          <Link to='/login'>Already have an account? Log in here!</Link>
        </Flex>
      </Form>
    </Card>
  );
};

export default Registration;
