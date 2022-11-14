import React from 'react';
import styled from 'styled-components';
import { MovieItem } from './MovieItem';
import useSelector from './../../../../hooks/useSelector';

export function MovieList({ movieList }: { movieList: any[] }) {
  useSelector(state => state.sortOrder);

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
  justify-content: space-between;
`;
