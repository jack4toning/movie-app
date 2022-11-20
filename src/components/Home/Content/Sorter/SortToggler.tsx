import React, { useState } from 'react';
import styled from 'styled-components';
import triangle from '../../../../assets/images/triangle.svg';
import {
  fetchMovieList,
  orderTypes,
  OrderTypes,
  sortTypes,
  SortTypes,
} from '../../../../store/features/movieListSlice';
import { useDispatch } from '../../../../store/hooks';

export function SortToggler() {
  const [toggle, setToggle] = useState(false);
  const [sortType, setSortType] = useState<SortTypes>(sortTypes[0]);
  const [orderType, setOrderType] = useState<OrderTypes>(orderTypes[0]);

  const dispatch = useDispatch();

  const handleToggle = () => {
    setToggle(prev => !prev);
  };

  const handleSelect = (sortType: SortTypes) => {
    setSortType(sortType);
    dispatch(fetchMovieList({ sortBy: sortType, sortOrder: orderType }));
  };

  const handleOrder = () => {
    const sortOrder = orderType === 'asc' ? 'desc' : 'asc';
    setOrderType(sortOrder);
    dispatch(fetchMovieList({ sortBy: sortType, sortOrder }));
  };

  return (
    <Container>
      <OptionsWrapper>
        <Option onClick={handleToggle}>{sortType}</Option>
        {toggle &&
          sortTypes
            .filter(st => st !== sortType)
            .map((st, index) => (
              <Option
                key={index}
                onClick={() => {
                  handleSelect(st);
                  handleToggle();
                }}>
                {st}
              </Option>
            ))}
      </OptionsWrapper>
      <Triangle
        style={{ transform: `rotateX(${orderType === 'asc' ? '180deg' : 0})` }}
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
