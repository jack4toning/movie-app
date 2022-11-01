import React from 'react';
import styled from 'styled-components';

export function DateSorter() {
  return (
    <Container>
      <ThinText>Sort by</ThinText>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

const ThinText = styled.div`
  font-weight: 300;
  font-size: 16px;
  text-transform: uppercase;
  opacity: 0.6;
  letter-spacing: 0.89px;
  color: #fff;
  height: 60px;
  line-height: 60px;
`;
