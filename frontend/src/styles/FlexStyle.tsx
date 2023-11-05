import { css } from 'styled-components';

const flexV = css`
  display: flex;
  flex-direction: column;
`;
const flexH = css`
  display: flex;
  flex-direction: row;
`;
const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const fullWH = css`
  width: 100%;
  height: 100%;
`;
export { flexV, flexH, flexCenter, fullWH };
