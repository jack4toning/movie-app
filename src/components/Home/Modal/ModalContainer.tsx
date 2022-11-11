import React from 'react';
import styled from 'styled-components';

export default function ModalContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <Background />
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </Container>
  );
}

const Container = styled.div`
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 1200px;
  height: 1359px;
`;

const ChildrenWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(35, 35, 35, 0.918051);
  mix-blend-mode: normal;
  opacity: 0.89;
  backdrop-filter: blur(12.2323px);
  /* Note: backdrop-filter has minimal browser support */
`;
