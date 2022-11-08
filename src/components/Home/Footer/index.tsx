import React from 'react';
import styled from 'styled-components';
import TextLogo from '../../Common/TextLogo';

export function Footer() {
  return (
    <Container>
      <TextLogo />
    </Container>
  );
}

const Container = styled.div`
  width: 1200px;
  height: 70px;
  background: #424242;
  display: flex;
  justify-content: center;
  align-items: center;
`;
