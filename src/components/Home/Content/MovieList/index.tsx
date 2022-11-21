import React from 'react';
import styled from 'styled-components';
import { Movie } from '../../../../store/features/movieListSlice';
import { MovieItem } from './MovieItem';

export function MovieList({ movieList }: { movieList: Movie[] }) {
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
