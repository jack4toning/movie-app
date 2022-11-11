import React from 'react';
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
import mockData from '../../mock/mockData.json';
import useGlobalState from '../../hooks/useGlobalState';

const { data: movieList } = mockData;

export function Home() {
  const { modalState } = useGlobalState();
  const { addModalOpen, editModalOpen, delModalOpen, infoModalOpen } =
    modalState.modalOpen;

  const isModalOpen =
    addModalOpen || editModalOpen || delModalOpen || infoModalOpen;

  if (isModalOpen) window.scrollTo({ top: 0, left: 0 });

  return (
    <Container>
      <Header />
      <Content movieList={movieList} isModalOpen={isModalOpen} />
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
