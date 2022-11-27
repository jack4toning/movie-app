import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { GenreToggler } from './GenreToggler';
import DatePicker from './DatePicker';
import { formatRuntime } from '../../../utils';
import { useDispatch, useSelector } from '../../../store/hooks';
import { addMovie, editMovie } from '../../../store/features/movieListSlice';
import { toggleModal } from '../../../store/features/modalSlice';
import {
  clearForm,
  changeReleaseDate,
  changeGenres,
} from '../../../store/features/formSlice';
import { CloseButton } from './CloseButton';
import { Formik } from 'formik';
import * as Yup from 'yup';

type FormikValues = {
  title: string;
  poster_path: string;
  vote_average: number;
  runtime: number;
  overview: string;
};

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

  console.log(form);

  const [releaseDateError, setReleaseDateError] = useState('');

  const [genreTogglerError, setGenreTogglerError] = useState('');

  const [showRuntimeInHM, setShowRuntimeInHM] = useState(true);

  const handleMouseEnterHMI = () => {
    setShowRuntimeInHM(false);
  };

  const handleMouseLeaveHMI = () => {
    setShowRuntimeInHM(true);
  };

  const handleGlobalFormReset = () => {
    dispatch(clearForm());
  };

  const handleSubmit = (values: FormikValues) => {
    const movieProps = {
      ...values,
      tagline: 'test',
      vote_count: 0,
      release_date,
      budget: 0,
      revenue: 0,
      genres,
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

  const handleChangeReleaseDate = (releaseDate: string) => {
    dispatch(changeReleaseDate(releaseDate));
  };

  const handleChangeMovieGenres = (genres: string[]) => {
    dispatch(changeGenres(genres));
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    poster_path: Yup.string().url('Invalid url').required('Required'),
    vote_average: Yup.number()
      .min(0, 'Min value is 0')
      .max(10, 'Max value is 10')
      .required('Required'),
    runtime: Yup.number()
      .min(0, 'Min value is 0')
      .max(1440, 'Max value is 1440')
      .required('Required'),
    overview: Yup.string()
      .max(1000, 'Must be 1000 characters or less')
      .required('Required'),
  });

  return (
    <Container>
      <CloseButton position={30} modalType={type} />
      <Title>{formTitle}</Title>
      <Formik
        enableReinitialize
        initialValues={{
          title,
          poster_path,
          vote_average: vote_average ? vote_average : '',
          runtime: runtime ? runtime : '',
          overview,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          // @ts-ignore
          // this value would have been validated before it is sent out
          handleSubmit(values);
        }}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
          isValid,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <FlexWrapper>
              <OptionWrapper>
                <SmallTitle>title</SmallTitle>
                <MovieTitle
                  name='title'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  placeholder='title'
                />
                <ValidationMsg>
                  {errors.title && touched.title && errors.title}
                </ValidationMsg>
              </OptionWrapper>
              <OptionWrapper>
                <SmallTitle>release date</SmallTitle>
                <DatePicker
                  date={release_date}
                  onChange={handleChangeReleaseDate}
                  handleError={setReleaseDateError}
                />
                {releaseDateError && (
                  <ValidationMsg>{releaseDateError}</ValidationMsg>
                )}
              </OptionWrapper>
              <OptionWrapper>
                <SmallTitle>movie url</SmallTitle>
                <PosterPath
                  name='poster_path'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.poster_path}
                  placeholder='https://'
                />
                <ValidationMsg>
                  {errors.poster_path &&
                    touched.poster_path &&
                    errors.poster_path}
                </ValidationMsg>
              </OptionWrapper>
              <OptionWrapper>
                <SmallTitle>rating</SmallTitle>
                <Rating
                  type='number'
                  name='vote_average'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.vote_average}
                  placeholder='7.8'
                />
                <ValidationMsg>
                  {errors.vote_average &&
                    touched.vote_average &&
                    errors.vote_average}
                </ValidationMsg>
              </OptionWrapper>
              <OptionWrapper>
                <SmallTitle>genre</SmallTitle>
                <GenreToggler
                  selectedGenres={genres}
                  onChange={handleChangeMovieGenres}
                  handleError={setGenreTogglerError}
                />
                {genreTogglerError && (
                  <ValidationMsg>{genreTogglerError}</ValidationMsg>
                )}
              </OptionWrapper>
              <OptionWrapper style={{ position: 'relative' }}>
                <SmallTitle>runtime</SmallTitle>
                {!showRuntimeInHM && (
                  <Runtime
                    type='number'
                    name='runtime'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.runtime}
                    placeholder='minutes'
                    autoFocus
                    onMouseLeave={handleMouseLeaveHMI}
                  />
                )}
                {showRuntimeInHM && (
                  <>
                    <Runtime
                      style={{ position: 'absolute', opacity: 0 }}
                      type='number'
                      name='runtime'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.runtime}
                      placeholder='minutes'
                      autoFocus
                      onMouseLeave={handleMouseLeaveHMI}
                    />
                    <RuntimeInHM
                      placeholder='minutes'
                      value={formatRuntime(values.runtime)}
                      onMouseEnter={handleMouseEnterHMI}
                      onChange={() => {}}
                    />
                  </>
                )}
                <ValidationMsg>
                  {errors.runtime && touched.runtime && errors.runtime}
                </ValidationMsg>
              </OptionWrapper>
              <OptionWrapper>
                <SmallTitle>overview</SmallTitle>
                <Overview
                  name='overview'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.overview}
                  placeholder='Movie description'
                />
                <ValidationMsg top={234}>
                  {errors.overview && touched.overview && errors.overview}
                </ValidationMsg>
              </OptionWrapper>
            </FlexWrapper>
            <ResetButton
              type='reset'
              onClick={() => {
                handleReset();
                handleGlobalFormReset();
              }}>
              Reset
            </ResetButton>
            <SubmitButton type='submit' disabled={!isValid}>
              Submit
            </SubmitButton>
          </form>
        )}
      </Formik>
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
  position: relative;
  margin-bottom: 30px;

  &:nth-child(odd) {
    margin-right: 30px;
  }
`;

const ValidationMsg = styled.div`
  position: absolute;
  top: 95px;
  font-size: 12px;
  font-weight: 600;
  opacity: 0.8;
  color: #e53e3e;

  top: ${({ top }: { top?: number }) => top + 'px'};
`;

const Button = styled.button`
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
  border: none;
  outline: none;
`;

const ResetButton = styled(Button)`
  right: 253px;
  color: #f65261;
  border: 1.5px solid #f65261;
  background: none;
`;

const SubmitButton = styled(Button)`
  right: 60px;
  color: #fff;
  background: #f65261;

  :disabled {
    background: rgba(50, 50, 50, 0.948044);
    opacity: 0.8;
    color: #949494;
  }
`;
