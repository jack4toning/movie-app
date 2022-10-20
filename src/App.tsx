import React from 'react';
import styled from 'styled-components';
import { Counter, SearchBar, GenreToggler } from './components';

function App() {
  return (
    <Container>
      <Header>Hello Pokemon!</Header>
      <Counter />
      <SearchBar />
      <GenreToggler />
    </Container>
  );
}

export default App;

const Header = styled.h1`
  background-image: linear-gradient(to right, #ff0000, #a1f100);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0px 0px 8px #ff8e8e;
  margin-bottom: 4rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4rem;
`;
