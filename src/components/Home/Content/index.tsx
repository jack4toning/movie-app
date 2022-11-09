import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GenreFilter } from './GenreFilter';
import { Sorter } from './Sorter';
import { MovieList } from './MovieList';

export function Content(props: { movieList: any[] }) {
  const { movieList } = props;

  return (
    <Container>
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
  movieList: PropTypes.array.isRequired,
};

const Container = styled.div`
  width: 1200px;
  background: #232323;
  padding: 0 60px 23px 60px;
  /* margin-bottom: 10px; */
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
