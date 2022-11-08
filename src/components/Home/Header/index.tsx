import React from 'react';
import styled from 'styled-components';
import TextLogo from '../../Common/TextLogo';
import AddMovieButton from './AddMovieButton';
import SearchBar from './SearchBar';
import movieBackground from '../../../assets/images/movie-background.png';

export function Header() {
  return (
    <Container>
      <TextLogo position />
      <AddMovieButton />
      <SearchBar />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  height: 396px;
  width: 1200px;
  background: url(${movieBackground}) #000;
  margin-bottom: 10px;
`;
