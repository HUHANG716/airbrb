import { Form as _Form, Card as _Card } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { AuthResponse, UserRegisterForm } from '../../types/user';
import apiReq from '../../utils/apiReq';
import { useNavigate } from 'react-router-dom';
import { useGlobalComponents } from '../../context/GlobalComponentsContext/GlobalComponentsContext';
import { useUser } from '../../context/UserContext/UserContext';
import { CommonContentWrapper, sm } from '../../styles/GlobalStyle';
import RegistrationForm from './components/RegistrationForm';

export const Form = styled(_Form)`
  width: 100%;
`;
const Card = styled(_Card)`
  margin-top: 5vh;
  width: 100%;
  max-width: 500px;
  ${sm`max-width: 380px;`}
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
      const res = await apiReq.post<AuthResponse>('/user/auth/register', {
        email,
        name,
        password,
      });
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
    <CommonContentWrapper>
      <Card title='Sign Up'>
        <RegistrationForm
          disabled={disabled}
          form={form}
          onFinish={handleFinish}
        />
      </Card>
    </CommonContentWrapper>
  );
};

export default Registration;
