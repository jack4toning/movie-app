import React, { useEffect, useRef } from 'react';
import {
  Header,
  Content,
  Footer,
  AddModal,
  EditModal,
  InfoModal,
  DelModal,
} from '../../components/Home';
import styled from 'styled-components';
import mockData from '../../mock/mockData.json';
import useSelector from '../../hooks/useSelector';

const { data: movieList } = mockData;

type Movie = {
  id?: number;
  title: string;
  rating: number;
  releaseDate: string;
  movieUrl: string;
  overview: string;
  genres: string[];
  runtime: number;
};

const addMovie = (movie: Movie) => {
  // find the maximal id
  let maxId = 0;
  movieList.forEach(({ id }) => {
    if (id > maxId) maxId = id;
  });
  maxId++;
  console.log(maxId);

  const {
    title,
    releaseDate: release_date,
    movieUrl: poster_path,
    rating: vote_average,
    genres,
    runtime,
    overview,
  } = movie;

  const m = {
    id: maxId,
    title,
    tagline: '',
    vote_average,
    vote_count: 0,
    release_date,
    poster_path,
    overview,
    budget: 0,
    revenue: 0,
    genres,
    runtime,
  };
  movieList.push(m);
};

const editMovie = (movie: Movie) => {
  const {
    id,
    title,
    releaseDate: release_date,
    movieUrl: poster_path,
    rating: vote_average,
    genres,
    runtime,
    overview,
  } = movie;
  const targetMovie = movieList.find(movie => movie.id === id);
  targetMovie!.title = title;
  targetMovie!.release_date = release_date;
  targetMovie!.poster_path = poster_path;
  targetMovie!.vote_average = vote_average;
  targetMovie!.genres = genres;
  targetMovie!.runtime = runtime;
  targetMovie!.overview = overview;
};

const delMovie = (id: number) => {
  const index = movieList.findIndex(movie => movie.id === id);
  movieList.splice(index, 1);
};

export { addMovie, editMovie, delMovie };

export function Home() {
  const { modalOpen } = useSelector(state => state.modal);
  const { addModalOpen, editModalOpen, delModalOpen, infoModalOpen } =
    modalOpen;

  const isModalOpen =
    addModalOpen || editModalOpen || delModalOpen || infoModalOpen;

  const coordinate = useRef({ topLeft: { top: 0, left: 0 }, isModalOpen });

  if (isModalOpen !== coordinate.current.isModalOpen)
    coordinate.current.topLeft = { top: window.scrollY, left: window.scrollX };

  useEffect(() => {
    if (isModalOpen) {
      window.scrollTo({ top: 0, left: 0 });
    } else {
      window.scrollTo(coordinate.current.topLeft);
    }
  }, [isModalOpen]);

  return (
    <Container>
      <Header />
      <Content movieList={movieList} isModalOpen={isModalOpen} />
      <Footer />
      {addModalOpen && <AddModal />}
      {editModalOpen && <EditModal />}
      {delModalOpen && <DelModal />}
      {infoModalOpen && <InfoModal />}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;
