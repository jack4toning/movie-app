import React from 'react';
import styled from 'styled-components';
import magnifier from '../../assets/images/magnifier.svg';
import { Movie } from '../../store/features/movieListSlice';
import { clearSelectedMovie } from '../../store/features/selectedMovieSlice';
import { useDispatch } from '../../store/hooks';
import { formatRuntime, getGenreStr } from '../../utils';

export default function SelectedMovie({ movie }: { movie: Movie }) {
  const {
    title,
    vote_average,
    release_date: releaseDate,
    poster_path: movieUrl,
    overview,
    genres,
    runtime,
  } = movie;

  const dispatch = useDispatch();

  const releaseYear = releaseDate.split('-')[0];
  const rating = String(vote_average).substring(0, 4);

  const handleMagnifierClick = () => {
    dispatch(clearSelectedMovie());
  };

  return (
    <Container>
      <TextLogo>netflixroulette</TextLogo>
      <Magnifier onClick={handleMagnifierClick} />
      <FlexWrapper>
        <Poster src={movieUrl} alt='poster' />
        <MovieInfo>
          <FlexWrapper>
            <Title>{title}</Title>
            <Rating>{rating}</Rating>
          </FlexWrapper>
          <Genres>{getGenreStr(genres)}</Genres>
          <FlexWrapper>
            <Year>{releaseYear}</Year>
            <RunTime>{formatRuntime(runtime)}</RunTime>
          </FlexWrapper>
          <Overview>{overview}</Overview>
        </MovieInfo>
      </FlexWrapper>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 1200px;
  height: 606px;
  padding: 0 60px;
  background: #232323;
  overflow: hidden;
`;

const TextLogo = styled.div`
  font-weight: 300;
  font-size: 20px;
  color: #f65261;
  margin-top: 37px;
  margin-bottom: 30px;
`;

const Magnifier = styled.div`
  position: absolute;
  top: 35px;
  right: 60px;
  width: 28px;
  height: 29px;
  background-image: url(${magnifier});
  background-size: contain;
  cursor: pointer;
`;

const FlexWrapper = styled.div`
  display: flex;
`;

const Poster = styled.img`
  display: block;
  width: 322px;
  height: 486px;
  margin-bottom: 29px;
  margin-right: 53px;
`;

const MovieInfo = styled.div`
  width: 705px;
`;

const Title = styled.div`
  flex-shrink: 1;
  font-weight: 300;
  font-size: 40px;
  height: 49px;
  line-height: 49px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-right: 25px;
  margin-bottom: 9px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Rating = styled.div`
  flex-shrink: 0;
  position: relative;
  top: -7px;
  width: 60px;
  height: 60px;
  line-height: 60px;
  border-radius: 50%;
  border: 1px solid #ffffff;
  text-align: center;
  font-size: 20px;
  font-weight: 300;
  text-transform: uppercase;
`;

const Genres = styled.div`
  font-size: 14px;
  opacity: 0.5;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-indent: 5px;
  margin-bottom: 30px;
`;

const Year = styled.div`
  font-weight: 300;
  font-size: 24px;
  color: #f65261;
`;

const RunTime = styled(Year)`
  margin-left: 51px;
  margin-bottom: 29px;
`;

const Overview = styled.div`
  width: 698px;
  height: 292px;
  font-weight: 300;
  font-size: 20px;
  mix-blend-mode: normal;
  opacity: 0.5;
`;
