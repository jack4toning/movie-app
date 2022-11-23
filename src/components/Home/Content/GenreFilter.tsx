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
  const { filter: filters } = data.fetchOptions;

  const handleSelectFilter = (selectedFilter: GenreFilters) => {
    let gFilters: GenreFilters[];
    // check if selected filter is already active
    if (!checkActive(selectedFilter)) {
      // selectedFilter is not active
      // for filter "", aka. All, just set filters to All
      if (selectedFilter === '') gFilters = [''];
      // for others,
      // if filters already includes "", just set filters to the selectedFilter
      else if (checkActive('')) gFilters = [selectedFilter];
      // else filters doesn't include "", just add selectedFilter to filters
      else gFilters = [...filters, selectedFilter];

      dispatch(changeFilter(gFilters));
      dispatch(fetchMovieList());
    } else {
      // selectedFilter is active
      if (selectedFilter === '') {
        // for filter "", aka. All, not need to changeFilters, just refetch movie list.
        dispatch(fetchMovieList());
        return;
      } else {
        // for others,
        if (filters.length === 1) {
          // if filters only include 1 filter(just the selected filter)
          // just active only filter "", then refetch movie list.
          dispatch(changeFilter(['']));
          dispatch(fetchMovieList());
        } else {
          // otherwise, deactive itself then refetch movie list.
          gFilters = filters.filter(filter => filter !== selectedFilter);

          dispatch(changeFilter(gFilters));
          dispatch(fetchMovieList());
        }
      }
    }
  };

  const checkActive = (genreFilter: GenreFilters) => {
    return filters.findIndex(filter => filter === genreFilter) !== -1;
  };

  return (
    <Container>
      {genreFilters.map((gf, index) => (
        <Genre
          key={index}
          style={checkActive(gf) ? { borderBottom: '2px solid #f65261' } : {}}
          onClick={() => {
            handleSelectFilter(gf);
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
