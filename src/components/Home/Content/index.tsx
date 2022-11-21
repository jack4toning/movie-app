import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GenreFilter } from './GenreFilter';
import { Sorter } from './Sorter';
import { MovieList } from './MovieList';
import { useSelector, useDispatch } from '../../../store/hooks';
import { fetchMovieList } from '../../../store/features/movieListSlice';

export function Content(props: { modalToggle: boolean }) {
  const { modalToggle } = props;

  const dispatch = useDispatch();
  const { data } = useSelector(state => state.movieList);
  const movieList = data.data;

  useEffect(() => {
    dispatch(fetchMovieList());
  }, [dispatch]);

  return (
    <Container modalToggle={modalToggle}>
      <FilterSorterWrapper>
        <GenreFilter />
        <Sorter />
        <Horizon />
      </FilterSorterWrapper>
      <MovieListWrapper>
        <MoviesCount>
          <CountNumber>{movieList.length}</CountNumber> movies found
        </MoviesCount>
        <MovieList movieList={movieList} />
      </MovieListWrapper>
    </Container>
  );
}

Content.propTypes = {
  modalToggle: PropTypes.bool.isRequired,
};

const Container = styled.div`
  width: 1200px;
  height: ${({ modalToggle }: { modalToggle: boolean }) =>
    modalToggle ? '953px' : 'auto'};
  background: #232323;
  padding: 0 60px 23px 60px;
  /* overflow: hidden; */
  /* margin-bottom: 10px; */
  margin-top: 10px;
`;

const FilterSorterWrapper = styled.div`
  position: relative;
  height: 64px;
`;

const Horizon = styled.div`
  width: 100%;
  height: 4px;
  background: #424242;
  border-bottom: 2px solid #080707;
  position: absolute;
  top: 60px;
`;

const MovieListWrapper = styled.div`
  margin-top: 24px;
`;

const MoviesCount = styled.div`
  font-size: 20px;
  margin-bottom: 28px;
`;

const CountNumber = styled.span`
  font-weight: 600;
`;
