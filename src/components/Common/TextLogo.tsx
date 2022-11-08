import React from 'react';
import styled, { css } from 'styled-components';

export default function TextLogo({ position }: { position?: boolean }) {
  return (
    <Container position={position}>
      <BoldLogoText>netflix</BoldLogoText>
      <ThinLogoText>roulette</ThinLogoText>
    </Container>
  );
}

const Container = styled.div`
  z-index: 3;

  ${(props: { position?: boolean }) =>
    props.position &&
    css`
      position: absolute;
      left: 60px;
      top: 20px;
    `}
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
