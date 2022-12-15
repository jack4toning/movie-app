import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  GenreFilters,
  genreFilters,
} from '../../../store/features/movieListSlice';

export function GenreFilter() {
  // const { filter: filters } = data.fetchOptions;
  const [searchParams, setSearchParams] = useSearchParams();
  let genreParam = searchParams.get('genre');
  let filters: string[] = [''];
  if (genreParam) filters = genreParam.split(',');
  console.log(searchParams.get('genre'));

  const handleSelectFilter = (selectedFilter: GenreFilters) => {
    // let gFilters: GenreFilters[];
    let gFilters: string[];
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
    } else {
      // selectedFilter is active
      if (selectedFilter === '') {
        // for filter "", aka. All, not need to changeFilters, just refetch movie list.
        gFilters = [''];
      } else {
        // for others,
        if (filters.length === 1) {
          // if filters only include 1 filter(just the selected filter)
          // which means unselect that one, so just active filter "", then refetch movie list.
          gFilters = [''];
        } else {
          // otherwise, deactive itself then refetch movie list.
          gFilters = filters.filter(filter => filter !== selectedFilter);
        }
      }
    }

    if (gFilters.length === 1 && gFilters[0] === '') {
      searchParams.delete('genre');
      setSearchParams(searchParams);
      return;
    }
    setSearchParams({ genre: gFilters.join() });
  };

  const checkActive = (genreFilter: GenreFilters) => {
    return (
      filters.findIndex(
        filter => filter.toUpperCase() === genreFilter.toUpperCase()
      ) !== -1
    );
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
