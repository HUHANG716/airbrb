import React from 'react';
import { ReactWrapper, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Registration from '../pages/Registration/Registration';
import apiReq from '../utils/apiReq';
import { act } from 'react-dom/test-utils';
import { Input } from 'antd';

jest.mock('../utils/apiReq', () => ({
  post: jest.fn(),
}));
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));
jest.mock('../context/GlobalComponentsContext/GlobalComponentsContext', () => ({
  useGlobalComponents: () => ({
    notify: {
      success: jest.fn(),
      error: jest.fn(),
    },
  }),
}));

describe('Registration component', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/register']}>
        <Registration />
      </MemoryRouter>
    );
  });

  it('renders registration form with all required fields', () => {
    expect(wrapper.find(Input).exists()).toBeTruthy();
    expect(wrapper.find('input[id="name"]').exists()).toBeTruthy();
    expect(wrapper.find('input[id="password"]').exists()).toBeTruthy();
    expect(wrapper.find('input[id="confirmPassword"]').exists()).toBeTruthy();
  });

  it('will not trigger request if passwords do not match', async () => {
    const mockSuccessResponse = { data: { token: 'fake-token' } };
    (apiReq.post as jest.Mock).mockResolvedValue(mockSuccessResponse);

    wrapper.find('input[id="email"]').simulate('change', { target: { value: 'test@example.com' } });
    wrapper.find('input[id="name"]').simulate('change', { target: { value: 'Test User' } });
    wrapper.find('input[id="password"]').simulate('change', { target: { value: 'AAAAAAAAAA' } });
    wrapper.find('input[id="confirmPassword"]').simulate('change', { target: { value: 'BBBBBBBBB' } });
    wrapper.find('form').simulate('submit');

    await act(async () => {
      await Promise.resolve(wrapper);
    });
    expect(apiReq.post).not.toHaveBeenCalled();
  });

  it('allows the user to register', async () => {
    // mock the api call to succeed
    const mockSuccessResponse = { data: { token: 'fake-token' } };
    (apiReq.post as jest.Mock).mockResolvedValue(mockSuccessResponse);

    wrapper.find('input[id="email"]').simulate('change', { target: { value: 'test@example.com' } });
    wrapper.find('input[id="name"]').simulate('change', { target: { value: 'Test User' } });
    wrapper.find('input[id="password"]').simulate('change', { target: { value: 'password' } });
    wrapper.find('input[id="confirmPassword"]').simulate('change', { target: { value: 'password' } });
    wrapper.find('form').simulate('submit');

    await act(async () => {
      await Promise.resolve(wrapper);
    });
    // should pass the validation and call the api
    expect(apiReq.post).toHaveBeenCalledWith('/user/auth/register', {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password',
    });

    // Check if the user is redirected to the home page
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
  it('should not trigger success callback when api calling fails', async () => {
    // mock the api call to fail
    (apiReq.post as jest.Mock).mockRejectedValue(new Error('some error'));

    wrapper.find('input[id="email"]').simulate('change', { target: { value: 'test@example.com' } });
    wrapper.find('input[id="name"]').simulate('change', { target: { value: 'Test User' } });
    wrapper.find('input[id="password"]').simulate('change', { target: { value: 'password' } });
    wrapper.find('input[id="confirmPassword"]').simulate('change', { target: { value: 'password' } });
    wrapper.find('form').simulate('submit');

    await act(async () => {
      await Promise.resolve();
    });
    expect(apiReq.post).toHaveBeenCalledWith('/user/auth/register', {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password',
    });
    // should not redirect
    expect(mockNavigate).not.toHaveBeenCalledWith('/');
  });
});
