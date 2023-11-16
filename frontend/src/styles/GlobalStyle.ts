import styled, { createGlobalStyle } from 'styled-components';
import { flexV, fullWH } from './FlexStyle';
import { Flex, Typography } from 'antd';

const GlobalStyle = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
   
    }
  html,
  body,
  #root,
  .App {
    height: 100%; 
   
  }

  ol,
  ul,
  li {
    list-style: none;
  }

  button {
    cursor: pointer;
  }
`;
export const sm = (strings: TemplateStringsArray) => {
  return `@media screen and (max-width: 576px) { ${strings[0]} }`;
};
export const CommonContentWrapper = styled(Flex)`
  ${fullWH};
  ${flexV}
  ${sm`
    padding: 1rem;
  `}
  justify-content: center;
  align-items: center;
  padding: 4rem;
`;

export const ResponsiveText = styled(Typography.Text)`
  width: 100%;
  ${sm`
    font-size: 0.75rem;
 `}
`;
export const ResponsiveTextPure = styled.div`
  height: 100%;
  ${sm`
    font-size: 0.75rem;
 `}
`;
export const ResponsiveTitle = styled(Typography.Title)`
  ${sm`
    font-size: 2rem;
 `}
`;

export const EllipsisText = styled(ResponsiveText)`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
export const StrongEllipsisText = styled(EllipsisText)`
  font-weight: 00;
`;

export default GlobalStyle;
