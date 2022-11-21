import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GenreToggler } from './GenreToggler';
import DatePicker from './DatePicker';
import { CloseButton } from '../../Common';
import { formatRuntime } from '../../../utils';
import { useDispatch, useSelector } from '../../../store/hooks';
import { addMovie, editMovie } from '../../../store/features/movieListSlice';
import { toggleModal } from '../../../store/features/modalSlice';
import { clearForm } from '../../../store/features/formSlice';

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
    release_date: releaseDate,
    poster_path: movieUrl,
    vote_average: rating,
    genres,
    runtime,
    overview,
  } = form;

  console.log(form);

  const keep1DP = (numStr: string) => {
    // int should always be int. For example, 9.0 should be 9
    return parseFloat(Number(numStr).toFixed(1));
  };

  const [localForm, setlocalForm] = useState({
    title,
    releaseDate,
    movieUrl,
    rating: String(rating),
    genres,
    runtime: String(runtime),
    overview,
  });

  console.log(localForm);

  useEffect(() => {
    setlocalForm({
      title,
      releaseDate,
      movieUrl,
      rating: String(rating),
      genres,
      runtime: String(runtime),
      overview,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const formRuntime = Number(localForm.runtime);
  const hmRuntime =
    formRuntime === -1 || Number.isNaN(formRuntime)
      ? ''
      : formatRuntime(formRuntime);

  // avoid NaN or <0 input
  const excludeWrongNum = (numStr: string) => {
    const rt = Number(numStr);
    if (Number.isNaN(rt) || rt <= -1) return '';
    return numStr;
  };

  const [showHMIndicator, setShowHMIndicator] = useState(true);

  const handleMouseEnterHMI = () => {
    setShowHMIndicator(false);
  };
  const handleMouseLeaveHMI = () => {
    setShowHMIndicator(true);
  };

  const handleReset = () => {
    setlocalForm(() => ({
      title: '',
      releaseDate: '',
      movieUrl: '',
      rating: '-1',
      genres: [],
      runtime: '-1',
      overview: '',
    }));
  };

  const handleSubmit = () => {
    const movieProps = {
      title: localForm.title,
      tagline: 'test',
      vote_average: keep1DP(localForm.rating),
      vote_count: 0,
      release_date: localForm.releaseDate,
      poster_path: localForm.movieUrl,
      overview: localForm.overview,
      budget: 0,
      revenue: 0,
      genres: localForm.genres,
      runtime: Number(localForm.runtime),
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

  const handleChangeMovieTitie = (e: any) => {
    setlocalForm(prev => ({ ...prev, title: e.target.value }));
  };

  const handleChangeReleaseDate = (releaseDate: string) => {
    setlocalForm(prev => ({ ...prev, releaseDate }));
  };

  const handleChangeMovieUrl = (e: any) => {
    setlocalForm(prev => ({ ...prev, movieUrl: e.target.value }));
  };

  const handleChangeMovieRating = (e: any) => {
    setlocalForm(prev => ({ ...prev, rating: e.target.value }));
  };

  const handleChangeMovieGenres = (genres: string[]) => {
    setlocalForm(prev => ({ ...prev, genres }));
  };

  const handleChangeMovieRuntime = (e: any) => {
    setlocalForm(prev => ({ ...prev, runtime: e.target.value }));
  };

  const handleChangeMovieOverview = (e: any) => {
    setlocalForm(prev => ({ ...prev, overview: e.target.value }));
  };

  return (
    <Container>
      <CloseButton position={30} modalType={type} />
      <Title>{formTitle}</Title>
      <FlexWrapper>
        <OptionWrapper>
          <SmallTitle>title</SmallTitle>
          <LongInput
            placeholder='title'
            value={localForm.title}
            onChange={handleChangeMovieTitie}
          />
        </OptionWrapper>
        <OptionWrapper>
          <SmallTitle>release date</SmallTitle>
          <DatePicker
            date={localForm.releaseDate}
            onChange={handleChangeReleaseDate}
          />
        </OptionWrapper>
        <OptionWrapper>
          <SmallTitle>movie url</SmallTitle>
          <LongInput
            placeholder='https://'
            value={localForm.movieUrl}
            onChange={handleChangeMovieUrl}
          />
        </OptionWrapper>
        <OptionWrapper>
          <SmallTitle>rating</SmallTitle>
          <ShortInput
            placeholder='7.8'
            value={excludeWrongNum(localForm.rating)}
            onChange={handleChangeMovieRating}
          />
        </OptionWrapper>
        <OptionWrapper>
          <SmallTitle>genre</SmallTitle>
          <GenreToggler
            selectedGenres={localForm.genres}
            onChange={handleChangeMovieGenres}
          />
        </OptionWrapper>
        <OptionWrapper style={{ position: 'relative' }}>
          <SmallTitle>runtime</SmallTitle>
          {!showHMIndicator && (
            <ShortInput
              autoFocus
              placeholder='minutes'
              value={excludeWrongNum(localForm.runtime)}
              onChange={handleChangeMovieRuntime}
              onMouseLeave={handleMouseLeaveHMI}
            />
          )}
          {showHMIndicator && (
            <HMIndicator
              placeholder='minutes'
              value={hmRuntime}
              // TODO: 将这个组件单独创建一个文件，避免mouse enter事件导致整个表单重渲染
              onMouseEnter={handleMouseEnterHMI}
              onChange={() => {}}
            />
          )}
        </OptionWrapper>
        <OptionWrapper>
          <SmallTitle>overview</SmallTitle>
          <Overview
            placeholder='Movie description'
            value={localForm.overview}
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

const HMIndicator = styled(ShortInput)`
  /* position: absolute;
  left: 0; */
`;

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
