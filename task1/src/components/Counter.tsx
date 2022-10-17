import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import pokemon from '../assets/images/pokemon.png';

export function Counter() {
  const [counter, setCounter] = useState(1);

  const handleSub = () => {
    if (counter < 1) return;
    setCounter(prev => prev - 1);
  };
  const handleAdd = () => {
    if (counter > 9) return;
    setCounter(prev => prev + 1);
  };

  return (
    <Container>
      {React.createElement(
        CircleLineWrapper,
        { style: { transform: `translateX(${counter * 100}px)` } },

        React.createElement(DeepLine),
        React.createElement(
          Circle,
          { style: { backgroundImage: `url(${pokemon})` } },
          React.createElement(NumberWrapper, null, counter)
        )
      )}
      {/* <CircleLineWrapper
        style={{ transform: `translateX(${counter * 100}px)` }}>
        <DeepLine />
        <Circle style={{ backgroundImage: `url(${pokemon})` }}>
          <NumberWrapper>{counter}</NumberWrapper>
        </Circle>
      </CircleLineWrapper> */}
      <LightLine />
      <ButtonsWrapper>
        <CustButton
          variant='contained'
          style={{ margin: '2rem' }}
          onClick={handleSub}>
          -
        </CustButton>
        <CustButton
          variant='contained'
          style={{ margin: '2rem' }}
          onClick={handleAdd}>
          +
        </CustButton>
      </ButtonsWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 1080px;
  height: 300px;
  margin: 24px auto;
  overflow: hidden;
  position: relative;
`;

const Circle = styled.div`
  width: 80px;
  height: 80px;
  border: 3px solid #000;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  background-origin: border-box;
  background-size: cover;
`;

const DeepLine = styled.div`
  width: 1000px;
  border-bottom: 3px solid #000;
`;

const CircleLineWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  left: -1000px;
  z-index: 1;
  transition: transform 1s ease-out;
`;

const LightLine = styled.div`
  width: 100%;
  border-bottom: 3px solid #cacaca;
  position: relative;
  top: -42px;
`;

const CustButton = styled(Button)`
  width: 100px;
  height: 60px;
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NumberWrapper = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #000;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;
