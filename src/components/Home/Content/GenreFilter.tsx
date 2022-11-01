import React from 'react';
import styled from 'styled-components';

export function GenreFilter() {
  const genres = ['All', 'Documentary', 'Comedy', 'Horror', 'Crime', 'Other'];

  return (
    <Container>
      {genres.map(genre => (
        <Genre>{genre}</Genre>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

const Genre = styled.div`
  font-size: 16px;
  text-transform: uppercase;
  color: #fff;
  margin-right: 30px;
  height: 60px;
  line-height: 60px;
  cursor: pointer;
`;
