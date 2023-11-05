import React, { useState } from 'react';
import { Card, Form } from '../Registration/Registration';
import { Button, Flex, Input } from 'antd';
import { AuthResponse, UserLoginForm } from '../../types/user';
import { Link as _Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useGlobalComponents } from '../../context/GlobalComponentsContext/GlobalComponentsContext';

import apiReq from '../../utils/apiReq';
import { useUser } from '../../context/UserContext/UserContext';

export const Link = styled(_Link)`
  margin-top: 20px;
`;
const { Item } = Form;
const Login = () => {
  const [form] = Form.useForm<UserLoginForm>();
  const { notify } = useGlobalComponents();
  const [disabled, setDisabled] = useState(false);
  const { login } = useUser();
  const nav2 = useNavigate();
  const handleFinish = async () => {
    const { email, password } = form.getFieldsValue();
    setDisabled(true);
    try {
      const { token } = (await apiReq.post<AuthResponse>('/user/auth/login', { email, password })).data;
      login({
        email,
        token,
      });
      notify.success('Log in successfully!');
      nav2('/');
    } catch (err) {
      notify.error(err as string);
      setDisabled(false);
    }
  };
  return (
    <Card title='Log In'>
      <Form form={form} disabled={disabled} layout='vertical' onFinish={handleFinish}>
        <Flex vertical>
          <Item
            label='Email'
            name='email'
            rules={[
              {
                required: true,
                message: 'Please input your email!',
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
            <Input />
          </Item>
          <Button htmlType='submit' type='primary'>
            Log In
          </Button>

          <Link to='/register'>Don&apos;t have an account? Sign up here!</Link>
        </Flex>
      </Form>
    </Card>
  );
};

export default Login;
