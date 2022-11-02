import React from 'react';
import styled from 'styled-components';

export default function SearchBar() {
  return (
    <Container>
      <Title>FIND YOUR MOVIE</Title>
      <Input placeholder='What do you want to watch?' autoFocus />
      <Button>SEARCH</Button>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 101px;
  left: 120px;
`;

const Title = styled.p`
  font-weight: 300;
  font-size: 40px;
  margin: 0 0 38px 0;
`;

const Input = styled.input`
  width: 713px;
  height: 57px;
  background: rgba(50, 50, 50, 0.8);
  opacity: 0.7;
  border-radius: 4px;
  border: none;
  outline: none;
  text-indent: 1rem;
  caret-color: #d4d4d4;
  font-size: 20px;

  ::-webkit-input-placeholder {
    /*Webkit browsers*/
    font-family: 'Montserrat', sans-serif;
  }
`;

const Button = styled.button`
  width: 233px;
  height: 57px;
  margin: 0 0 0 14px;
  background-color: #f65261;
  border-radius: 4px;
  border: none;
  font-size: 20px;
  font-weight: 500;
  color: #fff;
  cursor: pointer;

  :hover {
    background-color: #eb4553;
  }
`;
