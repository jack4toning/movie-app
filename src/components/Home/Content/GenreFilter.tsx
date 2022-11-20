import React, { useState } from 'react';
import styled from 'styled-components';
import {
  fetchMovieList,
  GenreFilters,
  genreFilters,
} from '../../../store/features/movieListSlice';
import { useDispatch } from '../../../store/hooks';

export function GenreFilter() {
  const [genreFilter, setGenreFilter] = useState<GenreFilters>(genreFilters[0]);

  const dispatch = useDispatch();

  const handleFilter = (genreFilter: GenreFilters) => {
    dispatch(fetchMovieList({ filter: [genreFilter] }));
  };

  return (
    <Container>
      {genreFilters.map((gf, index) => (
        <Genre
          key={index}
          style={
            gf === genreFilter ? { borderBottom: '2px solid #f65261' } : {}
          }
          onClick={() => {
            setGenreFilter(gf);
            handleFilter(gf);
          }}>
          {gf}
        </Genre>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: absolute;
  left: 0;
`;

const Genre = styled.div`
  z-index: 1;
  box-sizing: content-box;
  font-size: 16px;
  text-transform: uppercase;
  margin-right: 30px;
  height: 60px;
  line-height: 60px;
  cursor: pointer;
`;
