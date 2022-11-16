import React from 'react';
import styled from 'styled-components';
import { MovieItem } from './MovieItem';

export function MovieList({ movieList }: { movieList: any[] }) {
  return (
    <Container>
      {movieList.map(movie => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;
