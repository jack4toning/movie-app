import React from 'react';
import styled from 'styled-components';
import { SortToggler } from './SortToggler';

export function Sorter() {
  return (
    <Container>
      <ThinText>Sort by</ThinText>
      <SortToggler />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: absolute;
  right: 0;
`;

const ThinText = styled.div`
  font-weight: 300;
  font-size: 16px;
  text-transform: uppercase;
  opacity: 0.6;
  letter-spacing: 0.89px;
  height: 60px;
  line-height: 60px;
  margin-right: 31px;
`;
