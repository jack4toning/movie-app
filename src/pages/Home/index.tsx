import React from 'react';
import { Header, Content, Footer } from '../../components/Home';
import mockData from '../../mock/mockData.json';

const { data: movieList } = mockData;

export function Home() {
  return (
    <div>
      <Header />
      <Content movieList={movieList} />
      <Footer />
    </div>
  );
}
