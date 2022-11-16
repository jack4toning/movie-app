import React, { Dispatch, useState } from 'react';
import styled from 'styled-components';
import triangle from '../../../../assets/images/triangle.svg';
import useDispatch from '../../../../hooks/useDispatch';
import {
  MovieListAction,
  MovieListState,
  sortTypes,
  SortTypes,
} from '../../../../hooks/useMovieList';
import useSelector from '../../../../hooks/useSelector';

export function SortToggler() {
  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch(
    dispatches => dispatches.movieList
  ) as Dispatch<MovieListAction>;

  const { sort } = useSelector(state => state.movieList) as MovieListState;

  const { type, order } = sort;

  const handleToggle = () => {
    setToggle(prev => !prev);
  };

  const handleSelect = (type: SortTypes) => {
    dispatch({ type: 'SORT_MOVIE', payload: { type, order } });
  };

  const handleOrder = () => {
    dispatch({
      type: 'SORT_MOVIE',
      payload: { type, order: order === 'desc' ? 'asc' : 'desc' },
    });
  };

  return (
    <Container>
      <OptionsWrapper>
        <Option onClick={handleToggle}>{type}</Option>
        {toggle &&
          sortTypes
            .filter(t => t !== type)
            .map((t, index) => (
              <Option
                key={index}
                onClick={() => {
                  handleSelect(t);
                  handleToggle();
                }}>
                {t}
              </Option>
            ))}
      </OptionsWrapper>
      <Triangle
        style={{ transform: `rotateX(${order === 'asc' ? '180deg' : 0})` }}
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
