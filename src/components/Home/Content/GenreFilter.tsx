import React, { useState } from 'react';
import styled from 'styled-components';

export function GenreFilter() {
  const genres = ['All', 'Documentary', 'Comedy', 'Horror', 'Crime', 'Other'];

  const [curGenre, setCurGenre] = useState(genres[0]);

  return (
    <Container>
      {genres.map(genre => (
        <Genre
          style={
            genre === curGenre ? { borderBottom: '2px solid #f65261' } : {}
          }
          onClick={() => {
            setCurGenre(genre);
          }}>
          {genre}
        </Genre>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: absolute;
  left: 0;
`;

const Genre = styled.div`
  z-index: 1;
  box-sizing: content-box;
  font-size: 16px;
  text-transform: uppercase;
  margin-right: 30px;
  height: 60px;
  line-height: 60px;
  cursor: pointer;
`;
