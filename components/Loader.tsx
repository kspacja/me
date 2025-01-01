import React from 'react';
import styled, { keyframes } from 'styled-components';

const progress = keyframes`
  100% {width:100%}
`;

const Bar = styled.div`
  width: 0;
  height: 100%;
  background: var(--left-column-color);
  animation: ${progress} 10s ease-out infinite;
`;

const ProgressBar = styled.div<{ size: number, $marginTop: number }>`
  width: 100%;
  height: ${({ size }) => size}px;
  margin-top: ${({ $marginTop }) => $marginTop}px;
`;

const Loader = ({ size = 10, marginTop = 0 }) => {
  return (
    <ProgressBar size={size} $marginTop={marginTop}>
      <Bar />
    </ProgressBar>
  );
};

export default Loader;
