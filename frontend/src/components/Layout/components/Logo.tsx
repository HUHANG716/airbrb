import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

const GoHomeButton = styled(Link)`
  font-size: 1.25rem;
  font-weight: 700;
`;
const Logo = () => {
  return <GoHomeButton to={'/'}>Airbrb</GoHomeButton>;
};

export default Logo;
