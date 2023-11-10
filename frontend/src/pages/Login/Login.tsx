import React, { useState } from 'react';
import { Form } from '../Registration/Registration';
import { Button, Flex, Input, Card as _Card } from 'antd';
import { AuthResponse, UserLoginForm } from '../../types/user';
import { Link as _Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useGlobalComponents } from '../../context/GlobalComponentsContext/GlobalComponentsContext';
import apiReq from '../../utils/apiReq';
import { useUser } from '../../context/UserContext/UserContext';
import { CommonContentWrapper, sm } from '../../styles/GlobalStyle';
import FormItem from 'antd/es/form/FormItem';

const Link = styled(_Link)`
  margin-top: 20px;
`;

const Card = styled(_Card)`
  ${sm`width: 350px;`}
`;
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
      console.log(123);

      notify.success('Log in successfully!');
      nav2('/');
    } catch (err) {
      notify.error(err as string);
      setDisabled(false);
    }
  };
  return (
    <CommonContentWrapper>
      <Card title='Log In'>
        <Form
          form={form}
          disabled={disabled}
          layout='vertical'
          onFinish={handleFinish}>
          <Flex vertical>
            <FormItem
              required
              label='Email'
              name='email'
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}>
              <Input />
            </FormItem>
            <FormItem
              required
              label='Password'
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}>
              <Input />
            </FormItem>
            <Button
              htmlType='submit'
              type='primary'>
              Log In
            </Button>

            <Link to='/register'>Don&apos;t have an account? Sign up here!</Link>
          </Flex>
        </Form>
      </Card>
    </CommonContentWrapper>
  );
};

export default Login;
