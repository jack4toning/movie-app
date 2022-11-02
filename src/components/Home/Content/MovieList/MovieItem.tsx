import React from 'react';
import styled from 'styled-components';

export function MovieItem({ movie }: { movie: any }) {
  const { poster_path, title, release_date, genres } = movie;

  const releaseYear = release_date.split('-')[0];
  const getGenreStr = (genres: string[]) => {
    const len = genres.length;

    if (len >= 3) return genres.join(', ');
    return genres.join(' & ');
  };

  return (
    <Container>
      <Poster src={poster_path} alt='poster' />
      <Wrapper>
        <MovieName>{title}</MovieName>
        <ReleaseYear>{releaseYear}</ReleaseYear>
      </Wrapper>
      <Genres>{getGenreStr(genres)}</Genres>
    </Container>
  );
}

const Container = styled.div`
  width: 322px;
  margin-bottom: 50px;
`;

const Poster = styled.img`
  width: 322px;
  height: 455px;
`;

const Wrapper = styled.div`
  margin: 22px 0 8px 0;
  display: flex;
  justify-content: space-between;
`;

const MovieName = styled.div`
  font-size: 18px;
  opacity: 0.7;
`;
const ReleaseYear = styled.div`
  font-size: 14px;
  opacity: 0.7;
  border: 1px solid #97979780;
  border-radius: 4px;
  padding: 3px 17px;
`;
const Genres = styled.div`
  font-size: 14px;
  opacity: 0.5;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
