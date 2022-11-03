import React, { useState } from 'react';
import styled from 'styled-components';
import triangle from '../../../../assets/images/triangle.svg';

export function SortToggler() {
  const [toggle, setToggle] = useState(false);
  const sortTypes = ['Release date', 'Movie name', 'Movie score'];
  const [curType, setCurType] = useState(sortTypes[0]);

  const handleClick = () => {
    setToggle(prev => !prev);
  };

  const handleSelect = (type: string) => {
    setCurType(type);
  };

  return (
    <Container>
      <OptionsWrapper>
        <Option onClick={handleClick}>{curType}</Option>
        {toggle &&
          sortTypes
            .filter(type => type !== curType)
            .map((type, index) => (
              <Option
                key={index}
                onClick={() => {
                  handleSelect(type);
                  handleClick();
                }}>
                {type}
              </Option>
            ))}
      </OptionsWrapper>
      <Triangle
        style={{ transform: `rotateX(${toggle ? '180deg' : 0})` }}
        onClick={() => {
          handleClick();
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
  width: 135px;
  cursor: pointer;
  text-indent: 2px;
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
