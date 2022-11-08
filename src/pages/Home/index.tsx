import React from 'react';
import { Header, Content, Footer, AddModal } from '../../components/Home';
import styled from 'styled-components';
import mockData from '../../mock/mockData.json';

const { data: movieList } = mockData;

export function Home() {
  return (
    <Container>
      <Header />
      <Content movieList={movieList} />
      <Footer />
      <AddModal />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;
