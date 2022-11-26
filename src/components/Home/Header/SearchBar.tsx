import React, {
  ChangeEvent,
  KeyboardEventHandler,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import {
  changeSearchString,
  fetchMovieList,
} from '../../../store/features/movieListSlice';
import { useDispatch } from '../../../store/hooks';
import miniCloseButton from '../../../assets/images/closeButton.svg';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const handleSearch = () => {
    dispatch(changeSearchString(value));
    dispatch(fetchMovieList());
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue('');
    dispatch(changeSearchString(''));
  };

  const handleEnter: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter' && value !== '') handleSearch();
  };

  useEffect(() => {
    return () => {
      dispatch(changeSearchString(''));
    };
  }, [dispatch]);

  return (
    <Container>
      <Title>FIND YOUR MOVIE</Title>
      <InputWrapper>
        <Input
          value={value}
          onChange={handleInput}
          onKeyUp={handleEnter}
          placeholder='What do you want to watch?'
          autoFocus
        />
        {value && <CloseButton onClick={handleClear} />}
      </InputWrapper>
      <Button onClick={handleSearch}>SEARCH</Button>
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

const InputWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

const CloseButton = styled.div`
  width: 21px;
  height: 21px;
  background-image: url(${miniCloseButton});
  background-size: cover;
  position: absolute;
  right: 15px;
  top: 18px;
  cursor: pointer;
  opacity: 0.7;
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
  color: #fff;

  &::-webkit-input-placeholder {
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
