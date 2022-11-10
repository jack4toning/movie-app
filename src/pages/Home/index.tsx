import React from 'react';
import {
  Header,
  Content,
  Footer,
  AddModal,
  // InfoModal,
  // DelModal,
} from '../../components/Home';
import styled from 'styled-components';
import mockData from '../../mock/mockData.json';
import useGlobalState from '../../hooks/useGlobalState';

const { data: movieList } = mockData;

export function Home() {
  const { modalOpen } = useGlobalState();

  return (
    <Container>
      <Header />
      <Content movieList={movieList} />
      <Footer />
      {modalOpen && <AddModal />}
      {/* {modalOpen && <InfoModal />} */}
      {/* {modalOpen && <DelModal />} */}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;
