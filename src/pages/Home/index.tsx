import React, { useEffect, useRef } from 'react';
import {
  Header,
  Content,
  Footer,
  AddModal,
  EditModal,
  InfoModal,
  DelModal,
} from '../../components/Home';
import styled from 'styled-components';
import useSelector from '../../hooks/useSelector';
import { ModalState } from '../../hooks/useModal';

export function Home() {
  const { modalOpen } = useSelector(state => state.modal) as ModalState;
  const { addModalOpen, editModalOpen, delModalOpen, infoModalOpen } =
    modalOpen;

  const isModalOpen =
    addModalOpen || editModalOpen || delModalOpen || infoModalOpen;

  const coordinate = useRef({ topLeft: { top: 0, left: 0 }, isModalOpen });

  if (isModalOpen !== coordinate.current.isModalOpen)
    coordinate.current.topLeft = { top: window.scrollY, left: window.scrollX };

  useEffect(() => {
    if (isModalOpen) {
      window.scrollTo({ top: 0, left: 0 });
    } else {
      window.scrollTo(coordinate.current.topLeft);
    }
  }, [isModalOpen]);

  return (
    <Container>
      <Header />
      <Content isModalOpen={isModalOpen} />
      <Footer />
      {addModalOpen && <AddModal />}
      {editModalOpen && <EditModal />}
      {delModalOpen && <DelModal />}
      {infoModalOpen && <InfoModal />}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;
