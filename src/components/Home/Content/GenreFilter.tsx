import React, { Dispatch } from 'react';
import styled from 'styled-components';
import useDispatch from '../../../hooks/useDispatch';
import {
  genreFilters,
  GenreFilters,
  MovieListAction,
  MovieListState,
} from '../../../hooks/useMovieList';
import useSelector from '../../../hooks/useSelector';

export function GenreFilter() {
  const dispatch = useDispatch(
    dispatches => dispatches.movieList
  ) as Dispatch<MovieListAction>;

  const { genreFilter, sort } = useSelector(
    state => state.movieList
  ) as MovieListState;

  const handleFilter = (genreFilter: GenreFilters) => {
    dispatch({ type: 'FILTER_MOVIE', payload: { genreFilter } });
    dispatch({ type: 'SORT_MOVIE', payload: { ...sort } });
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
