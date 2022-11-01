import React from 'react';
import styled from 'styled-components';

export function Footer() {
  return (
    <Container>
      <BoldLogoText>netflix</BoldLogoText>
      <ThinLogoText>roulette</ThinLogoText>
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

const BoldLogoText = styled.span`
  color: #f65261;
  display: inline-block;
  font-size: 20px;
  font-weight: 900;
`;

const ThinLogoText = styled(BoldLogoText)`
  font-weight: 500;
`;
