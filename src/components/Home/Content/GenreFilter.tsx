import React from 'react';
import styled from 'styled-components';
import {
  changeFilter,
  fetchMovieList,
  GenreFilters,
  genreFilters,
} from '../../../store/features/movieListSlice';
import { useDispatch, useSelector } from '../../../store/hooks';

export function GenreFilter() {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.movieList);
  const { filter } = data.fetchOptions;

  const handleFilter = (genreFilter: GenreFilters) => {
    dispatch(changeFilter([genreFilter]));
    dispatch(fetchMovieList());
  };

  return (
    <Container>
      {genreFilters.map((gf, index) => (
        <Genre
          key={index}
          style={gf === filter[0] ? { borderBottom: '2px solid #f65261' } : {}}
          onClick={() => {
            handleFilter(gf);
          }}>
          {gf === '' ? 'All' : gf}
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
