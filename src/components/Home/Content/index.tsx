import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GenreFilter } from './GenreFilter';
import { DateSorter } from './DateSorter';

export function Content(props: { movieList: any[] }) {
  return (
    <Container>
      <FilterSorterWrapper>
        <GenreFilter />
        <DateSorter />
      </FilterSorterWrapper>
    </Container>
  );
}

Content.propTypes = {
  movieList: PropTypes.array.isRequired,
};

const Container = styled.div`
  width: 1200px;
  height: 1311px;
  background: #232323;
  padding: 1px 60px;
`;

const FilterSorterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
