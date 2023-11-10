import React from 'react';
import { Tag as _Tag, theme } from 'antd';
import styled from 'styled-components';

const { useToken } = theme;

export type TagType = 'default' | 'success' | 'error' | 'warning';
type Props = {
  className?: string;
  type?: TagType;
  children: React.ReactNode;
};

const Wrapper = styled(_Tag)<{
  type: string;
}>`
  color: ${({ type }) => type};
  border-color: ${({ type }) => type};
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Tag = ({ children, className = '', type = 'default' }: Props) => {
  const { token } = useToken();
  const colorDict: Record<TagType, string> = {
    default: token.colorPrimary,
    success: token.colorSuccess,
    error: token.colorError,
    warning: token.colorWarning,
  };
  return (
    <Wrapper
      type={colorDict[type]}
      className={className}>
      {children}
    </Wrapper>
  );
};

export default Tag;
