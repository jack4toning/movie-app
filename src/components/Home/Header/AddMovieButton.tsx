import React from 'react';
import styled from 'styled-components';

export default function AddMovieButton() {
  return <Button>+ ADD MOVIE</Button>;
}

const Button = styled.div`
  position: absolute;
  right: 56px;
  top: 20px;
  width: 177px;
  height: 46px;
  line-height: 46px;
  background: rgba(96, 96, 96, 0.68);
  border-radius: 4px;
  font-weight: 600;
  font-size: 20px;
  color: #f65261;
`;
