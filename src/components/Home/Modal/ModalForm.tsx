import React, { useState } from 'react';
import styled from 'styled-components';
import { GenreToggler } from './GenreToggler';
import DatePicker from './DatePicker';
import { CloseButton } from '../../Common';
import useSelector from '../../../hooks/useSelector';

export default function ModalForm({
  title,
  type,
}: {
  title: string;
  type: 'add' | 'edit';
}) {
  const { modalForm } = useSelector(state => state.modal);
  const {
    title: movieTitle,
    releaseDate,
    movieUrl,
    rating,
    genres,
    runtime,
    overview,
  } = modalForm;

  const [formState, setFormState] = useState({
    movieTitle,
    releaseDate,
    movieUrl,
    rating,
    genres,
    runtime,
    overview,
  });

  const hmRuntime =
    formState.runtime === 0
      ? ''
      : `${Math.floor(formState.runtime / 60)}h ${formState.runtime % 60}min`;
  const tfRating = formState.rating === 0 ? '' : formState.rating;

  const handleReset = () => {
    setFormState(() => ({
      movieTitle: '',
      releaseDate: '',
      movieUrl: '',
      rating: 0,
      genres: [],
      runtime: 0,
      overview: '',
    }));
  };

  const handleSubmit = () => {};

  const handleChangeMovieTitie = (e: any) => {
    setFormState(prev => ({ ...prev, movieTitle: e.target.value }));
  };

  const handleChangeReleaseDate = (releaseDate: string) => {
    setFormState(prev => ({ ...prev, releaseDate }));
  };

  const handleChangeMovieUrl = (e: any) => {
    setFormState(prev => ({ ...prev, movieUrl: e.target.value }));
  };

  const handleChangeMovieRating = (e: any) => {
    setFormState(prev => ({ ...prev, rating: e.target.value }));
  };

  const handleChangeMovieGenres = (genres: string[]) => {
    setFormState(prev => ({ ...prev, genres }));
  };

  const handleChangeMovieRuntime = (e: any) => {
    setFormState(prev => ({ ...prev, runtime: e.target.value }));
  };

  const handleChangeMovieOverview = (e: any) => {
    setFormState(prev => ({ ...prev, overview: e.target.value }));
  };

  return (
    <Container>
      <CloseButton position={30} modalType={type} />
      <Title>{title}</Title>
      <FlexWrapper>
        <OptionWrapper>
          <SmallTitle>title</SmallTitle>
          <LongInput
            placeholder='title'
            value={formState.movieTitle}
            onChange={handleChangeMovieTitie}
          />
        </OptionWrapper>
        <OptionWrapper>
          <SmallTitle>release date</SmallTitle>
          <DatePicker
            date={formState.releaseDate}
            onChange={handleChangeReleaseDate}
          />
        </OptionWrapper>
        <OptionWrapper>
          <SmallTitle>movie url</SmallTitle>
          <LongInput
            placeholder='https://'
            value={formState.movieUrl}
            onChange={handleChangeMovieUrl}
          />
        </OptionWrapper>
        <OptionWrapper>
          <SmallTitle>rating</SmallTitle>
          <ShortInput
            placeholder='7.8'
            value={tfRating}
            onChange={handleChangeMovieRating}
          />
        </OptionWrapper>
        <OptionWrapper>
          <SmallTitle>genre</SmallTitle>
          <GenreToggler
            selectedGenres={formState.genres}
            onChange={handleChangeMovieGenres}
          />
        </OptionWrapper>
        <OptionWrapper>
          <SmallTitle>runtime</SmallTitle>
          <ShortInput
            placeholder='minutes'
            value={hmRuntime}
            onChange={handleChangeMovieRuntime}
          />
        </OptionWrapper>
        <OptionWrapper>
          <SmallTitle>overview</SmallTitle>
          <TextArea
            placeholder='Movie description'
            value={formState.overview}
            onChange={handleChangeMovieOverview}
          />
        </OptionWrapper>
      </FlexWrapper>
      <ResetButton onClick={handleReset}>Reset</ResetButton>
      <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 976px;
  height: 917px;
  padding: 60px;
  margin: 175px auto;
  background: #232323;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1), 0px 2px 10px rgba(0, 0, 0, 0.07),
    0px 10px 20px rgba(0, 0, 0, 0.05), 0px 10px 50px rgba(0, 0, 0, 0.05);
`;

const Title = styled.div`
  color: #fff;
  text-transform: uppercase;
  font-weight: 300;
  font-size: 40px;
  letter-spacing: 1px;
  margin-bottom: 38px;
`;

const SmallTitle = styled.div`
  font-weight: 600;
  letter-spacing: 0.888889px;
  text-transform: uppercase;
  color: #f65261;
  opacity: 0.8;
  margin-bottom: 13px;
`;

const LongInput = styled.input`
  width: 525px;
  height: 57px;
  background: rgba(50, 50, 50, 0.948044);
  opacity: 0.8;
  border-radius: 4px;
  font-size: 20px;
  text-indent: 18px;
  border: none;
  outline: none;
  color: #fff;

  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  &::-webkit-input-placeholder {
    /*Webkit browsers*/
    font-family: 'Montserrat', sans-serif;
  }
`;

const ShortInput = styled(LongInput)`
  width: 301px;
  height: 57px;
`;

const TextArea = styled.textarea`
  width: 856px;
  height: 197px;
  padding: 18px 0 0 21px;
  font-size: 20px;
  border: none;
  outline: none;
  background: rgba(50, 50, 50, 0.948044);
  mix-blend-mode: normal;
  opacity: 0.8;
  border-radius: 4px;
  resize: none;
  color: #fff;
  padding-top: 18px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  &::-webkit-input-placeholder {
    /*Webkit browsers*/
    font-family: 'Montserrat', sans-serif;
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const OptionWrapper = styled.div`
  margin-bottom: 30px;

  &:nth-child(odd) {
    margin-right: 30px;
  }
`;

const Button = styled.div`
  position: absolute;
  bottom: 60px;
  width: 180px;
  height: 57px;
  line-height: 57px;
  font-weight: 500;
  font-size: 20px;
  text-align: center;
  text-transform: uppercase;
  border-radius: 4px;
  cursor: pointer;
`;

const ResetButton = styled(Button)`
  right: 253px;
  color: #f65261;
  border: 1.5px solid #f65261;
`;

const SubmitButton = styled(Button)`
  right: 60px;
  color: #fff;
  background: #f65261;
`;
