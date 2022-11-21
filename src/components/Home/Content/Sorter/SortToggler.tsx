import React, { useState } from 'react';
import styled from 'styled-components';
import triangle from '../../../../assets/images/triangle.svg';
import {
  changeSortBy,
  changeSortOrder,
  fetchMovieList,
  sortTypes,
  SortTypes,
} from '../../../../store/features/movieListSlice';
import { useDispatch, useSelector } from '../../../../store/hooks';

export function SortToggler() {
  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch();
  const { data } = useSelector(state => state.movieList);
  const { sortBy, sortOrder } = data.fetchOptions;

  const transformSortBy = (sortBy: SortTypes) => {
    let transformedSortBy = '';
    if (sortBy === 'release_date') transformedSortBy = 'Release date';
    else transformedSortBy = 'Rating';
    return transformedSortBy.toLocaleUpperCase();
  };

  const handleToggle = () => {
    setToggle(prev => !prev);
  };

  const handleSelect = (sortType: SortTypes) => {
    dispatch(changeSortBy(sortType));
    dispatch(fetchMovieList());
  };

  const handleOrder = () => {
    const sOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    dispatch(changeSortOrder(sOrder));
    dispatch(fetchMovieList());
  };

  return (
    <Container>
      <OptionsWrapper>
        <Option onClick={handleToggle}>{transformSortBy(sortBy)}</Option>
        {toggle &&
          sortTypes
            .filter(st => st !== sortBy)
            .map((st, index) => (
              <Option
                key={index}
                onClick={() => {
                  handleSelect(st);
                  handleToggle();
                }}>
                {transformSortBy(st)}
              </Option>
            ))}
      </OptionsWrapper>
      <Triangle
        style={{ transform: `rotateX(${sortOrder === 'asc' ? '180deg' : 0})` }}
        onClick={() => {
          handleOrder();
        }}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

const OptionsWrapper = styled.div`
  z-index: 1;
  background: #232323b3;
`;

const Option = styled.div`
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.89px;
  height: 60px;
  line-height: 60px;
  width: 142px;
  cursor: pointer;
  text-indent: 4px;

  &:nth-of-type(n + 2):hover {
    background: #f65261b3;
  }
`;

const Triangle = styled.div`
  position: relative;
  top: 24px;
  width: 10px;
  height: 7px;
  margin-left: 13px;
  vertical-align: 25px;
  background: url(${triangle});
  cursor: pointer;
  align-self: baseline;
`;
