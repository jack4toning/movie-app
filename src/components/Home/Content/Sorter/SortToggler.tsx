import React, { Dispatch, useEffect, useState } from 'react';
import styled from 'styled-components';
import triangle from '../../../../assets/images/triangle.svg';
import useDispatch from '../../../../hooks/useDispatch';
import { SortOrderAction } from '../../../../hooks/useSortOrder';
import { sortMovieList } from '../../../../mock/mockData';

const sortTypes = ['Release date', 'Movie name', 'Rating'] as const;
export type SortTypes = typeof sortTypes[number];
export type OrderTypes = 'asc' | 'desc';

export function SortToggler() {
  const [toggle, setToggle] = useState(false);

  const [curType, setCurType] = useState<SortTypes>(sortTypes[0]);
  const [order, setOrder] = useState<OrderTypes>('desc');

  const dispatch = useDispatch(
    dispatches => dispatches.sortOrder
  ) as Dispatch<SortOrderAction>;

  const handleToggle = () => {
    setToggle(prev => !prev);
  };

  const handleSelect = (type: SortTypes) => {
    setCurType(type);
  };

  const handleSort = (type: SortTypes, order: OrderTypes = 'desc') => {
    sortMovieList(type, order);
  };

  const handleOrder = () => {
    setOrder(prev => (prev === 'desc' ? 'asc' : 'desc'));
  };

  useEffect(() => {
    handleSort(curType, order);
    dispatch({ type: order === 'asc' ? 'orderByAsc' : 'orderByDesc' });
  }, [curType, dispatch, order]);

  return (
    <Container>
      <OptionsWrapper>
        <Option onClick={handleToggle}>{curType}</Option>
        {toggle &&
          sortTypes
            .filter(type => type !== curType)
            .map((type, index) => (
              <Option
                key={index}
                onClick={() => {
                  handleSelect(type);
                  handleToggle();
                }}>
                {type}
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
