import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { GenreToggler } from './GenreToggler';
import DatePicker from './DatePicker';
import { formatRuntime } from '../../../utils';
import { useDispatch, useSelector } from '../../../store/hooks';
import { addMovie, editMovie } from '../../../store/features/movieListSlice';
import { toggleModal } from '../../../store/features/modalSlice';
import {
  changeGenres,
  changeOverview,
  changePosterPath,
  changeReleaseDate,
  changeRuntime,
  changeTitle,
  changeVoteAverage,
  clearForm,
} from '../../../store/features/formSlice';
import { CloseButton } from './CloseButton';

export default function ModalForm({
  formTitle,
  type,
}: {
  formTitle: string;
  type: 'add' | 'edit';
}) {
  const { data: form } = useSelector(state => state.form);
  const dispatch = useDispatch();

  const {
    id,
    title,
    release_date,
    poster_path,
    vote_average,
    genres,
    runtime,
    overview,
  } = form;

  // console.log(form);

  const transformRating = (numStr: string) => {
    // clear front zeros and non numeric character
    numStr = numStr.replace(/^0+|[^\d]+/g, '');
    // allow user empty input
    if (numStr === '') return numStr;
    // For rating number, int should always be int. For example, 9.0 should be 9. Besides, 9.193 should be 9.1
    return parseFloat(Number(numStr).toFixed(1));
  };

  const transformString = (str: string) => {
    if (str === null) return '';
    return str;
  };

  // transform null to 0 or return num itself
  const transformNum = (num: number | string) => {
    if (num === null) return '';
    return num;
  };

  const transformToInt = (numStr: string) => {
    // clear front zeros and non numeric character
    numStr = numStr.replace(/^0+|[^\d]+/g, '');
    // allow user empty input
    if (numStr === '') return numStr;
    return parseInt(numStr);
  };

  const [showRuntimeInHM, setShowRuntimeInHM] = useState(true);

  const handleMouseEnterHMI = () => {
    setShowRuntimeInHM(false);
  };

  const handleMouseLeaveHMI = () => {
    setShowRuntimeInHM(true);
  };

  const handleReset = () => {
    dispatch(clearForm());
  };

  const handleSubmit = () => {
    const movieProps = {
      title,
      tagline: 'test',
      vote_average: vote_average === '' ? 0 : vote_average,
      vote_count: 0,
      release_date,
      poster_path,
      overview,
      budget: 0,
      revenue: 0,
      genres,
      runtime: runtime === '' ? 0 : runtime,
    };

    console.log(movieProps);

    if (type === 'add') {
      dispatch(addMovie(movieProps));
      dispatch(toggleModal('add'));
    } else if (type === 'edit') {
      dispatch(
        editMovie({
          id,
          ...movieProps,
        })
      );
      dispatch(toggleModal('edit'));
    }
    dispatch(clearForm());
  };

  const handleChangeMovieTitie = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTitle(e.target.value));
  };

  const handleChangeReleaseDate = (releaseDate: string) => {
    dispatch(changeReleaseDate(releaseDate));
  };

  const handleChangeMovieUrl = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changePosterPath(e.target.value));
  };

  const handleChangeMovieRating = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeVoteAverage(transformRating(e.target.value)));
  };

  const handleChangeMovieGenres = (genres: string[]) => {
    dispatch(changeGenres(genres));
  };

  const handleChangeMovieRuntime = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value, 'onchange');
    dispatch(changeRuntime(transformToInt(e.target.value)));
  };

  const handleChangeMovieOverview = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(changeOverview(e.target.value));
  };

  return (
    <Container>
      <CloseButton position={30} modalType={type} />
      <Title>{formTitle}</Title>
      <FlexWrapper>
        <OptionWrapper>
          <SmallTitle>title</SmallTitle>
          <MovieTitle
            placeholder='title'
            value={transformString(title)}
            onChange={handleChangeMovieTitie}
          />
        </OptionWrapper>
        <OptionWrapper>
          <SmallTitle>release date</SmallTitle>
          <DatePicker date={release_date} onChange={handleChangeReleaseDate} />
        </OptionWrapper>
        <OptionWrapper>
          <SmallTitle>movie url</SmallTitle>
          <PosterPath
            placeholder='https://'
            value={transformString(poster_path)}
            onChange={handleChangeMovieUrl}
          />
        </OptionWrapper>
        <OptionWrapper>
          <SmallTitle>rating</SmallTitle>
          <Rating
            type='number'
            min={'0'}
            placeholder='7.8'
            value={transformNum(vote_average)}
            onChange={handleChangeMovieRating}
          />
        </OptionWrapper>
        <OptionWrapper>
          <SmallTitle>genre</SmallTitle>
          <GenreToggler
            selectedGenres={genres}
            onChange={handleChangeMovieGenres}
          />
        </OptionWrapper>
        <OptionWrapper style={{ position: 'relative' }}>
          <SmallTitle>runtime</SmallTitle>
          {!showRuntimeInHM && (
            <Runtime
              type='number'
              min={'0'}
              autoFocus
              placeholder='minutes'
              value={transformNum(runtime)}
              onChange={handleChangeMovieRuntime}
              onMouseLeave={handleMouseLeaveHMI}
            />
          )}
          {showRuntimeInHM && (
            <RuntimeInHM
              placeholder='minutes'
              value={formatRuntime(runtime)}
              onMouseEnter={handleMouseEnterHMI}
              onChange={() => {}}
            />
          )}
        </OptionWrapper>
        <OptionWrapper>
          <SmallTitle>overview</SmallTitle>
          <Overview
            placeholder='Movie description'
            value={transformString(overview)}
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

// const RuntimeInput = styled(ShortInput)`
//   -webkit-text-fill-color: transparent;
// `;

const MovieTitle = styled(LongInput)``;

const PosterPath = styled(LongInput)``;

const Rating = styled(ShortInput)``;

const Runtime = styled(ShortInput)``;

const RuntimeInHM = styled(ShortInput)``;

const Overview = styled.textarea`
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

  &::-webkit-scrollbar {
    display: none;
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
