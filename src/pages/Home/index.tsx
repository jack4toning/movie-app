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
import SelectedMovie from '../../components/Home/SelectedMovie';
import { useSelector } from '../../store/hooks';

export function Home() {
  const { addToggle, editToggle, delToggle, infoToggle } = useSelector(
    state => state.modal
  );

  const modalToggle = addToggle || editToggle || delToggle || infoToggle;

  const coordinate = useRef({ topLeft: { top: 0, left: 0 }, modalToggle });

  if (modalToggle !== coordinate.current.modalToggle)
    coordinate.current.topLeft = { top: window.scrollY, left: window.scrollX };

  useEffect(() => {
    if (modalToggle) {
      window.scrollTo({ top: 0, left: 0 });
    } else {
      window.scrollTo(coordinate.current.topLeft);
    }
  }, [modalToggle]);

  const { data } = useSelector(state => state.selectedMovie);
  const selectedMovie = data.movie;

  useEffect(() => {
    selectedMovie && window.scrollTo({ top: 0, left: 0 });
  }, [selectedMovie]);

  console.log(data, selectedMovie);

  return (
    <Container>
      {selectedMovie ? <SelectedMovie movie={selectedMovie} /> : <Header />}
      <Content modalToggle={modalToggle} />
      <Footer />
      {addToggle && <AddModal />}
      {editToggle && <EditModal />}
      {delToggle && <DelModal />}
      {infoToggle && <InfoModal />}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;
