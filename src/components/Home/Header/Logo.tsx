import React from 'react';
import styled from 'styled-components';

export default function Logo() {
  return (
    <Container>
      <BoldLogoText>netflix</BoldLogoText>
      <ThinLogoText>roulette</ThinLogoText>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  left: 60px;
  top: 20px;
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
