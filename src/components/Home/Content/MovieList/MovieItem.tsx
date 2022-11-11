import React, { useState } from 'react';
import styled from 'styled-components';
import threeDots from '../../../../assets/images/threeDots.svg';
import miniCloseButton from '../../../../assets/images/miniCloseButton.svg';
import useGlobalState from '../../../../hooks/useGlobalState';

export function MovieItem({ movie }: { movie: any }) {
  const {
    poster_path: movie_url,
    title,
    release_date,
    genres,
    overview,
    vote_average: rating,
    runtime,
  } = movie;

  const releaseYear = release_date.split('-')[0];

  const getGenreStr = (genres: string[]) => {
    const len = genres.length;

    if (len >= 3) return genres.join(', ');
    return genres.join(' & ');
  };

  const [showMenuIcon, setShowMenuIcon] = useState(false);
  const [showMenuIconContent, setShowMenuContent] = useState(false);
  const { setModalState } = useGlobalState();

  const handleMouseEnter = () => {
    setShowMenuIcon(true);
  };
  const handleMouseLeave = () => {
    setShowMenuIcon(false);
    setShowMenuContent(false);
  };
  const handleMenuIconClick = () => {
    setShowMenuContent(true);
    setShowMenuIcon(false);
  };
  const handleCloseButtonClick = () => {
    setShowMenuContent(false);
  };
  const handleEdit = () => {
    setShowMenuContent(false);
    setModalState(prev => ({ ...prev, editModalOpen: true }));
  };
  const handleDelete = () => {
    setShowMenuContent(false);
    setModalState(prev => ({ ...prev, delModalOpen: true }));
  };

  return (
    <Container onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <ContextMenuIcon
        style={{ opacity: showMenuIcon ? '1' : '0' }}
        onClick={handleMenuIconClick}
      />
      {showMenuIconContent && (
        <ContextMenuContent>
          <MiniCloseButton onClick={handleCloseButtonClick} />
          <EditButton onClick={handleEdit}>Edit</EditButton>
          <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
        </ContextMenuContent>
      )}
      <Poster src={movie_url} alt='poster' />
      <Wrapper>
        <MovieName>{title}</MovieName>
        <ReleaseYear>{releaseYear}</ReleaseYear>
      </Wrapper>
      <Genres>{getGenreStr(genres)}</Genres>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 322px;
  margin-bottom: 50px;
`;

const ContextMenuIcon = styled.div`
  position: absolute;
  right: 14px;
  top: 14px;
  width: 36px;
  height: 36px;
  background-color: #2a202d;
  background-image: url(${threeDots});
  background-repeat: no-repeat;
  background-position: center center;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.196596);
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s ease;
  transition-property: opacity, background;

  &:hover {
    background-color: #221a25;
  }
`;

const ContextMenuContent = styled.div`
  position: absolute;
  right: 14px;
  top: 12px;
  width: 190px;
  background: rgba(35, 35, 35, 0.918051);
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1), 0px 2px 10px rgba(0, 0, 0, 0.1),
    0px 10px 20px rgba(0, 0, 0, 0.1), 0px 10px 50px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(13.5914px);
  /* Note: backdrop-filter has minimal browser support */
  border-radius: 4px;
`;

const MiniCloseButton = styled.div`
  width: 11px;
  height: 12px;
  background-image: url(${miniCloseButton});
  background-size: cover;
  position: absolute;
  right: 10px;
  top: 7px;
  cursor: pointer;
`;

const Button = styled.div`
  width: 100%;
  height: 34px;
  line-height: 34px;
  font-weight: 500;
  text-indent: 23px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1), 0px 10px 20px rgba(0, 0, 0, 0.1),
    0px 10px 50px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(13.5914px);
  /* Note: backdrop-filter has minimal browser support */
  cursor: pointer;

  &:hover {
    background: #f65261;
  }
`;

const EditButton = styled(Button)`
  margin-top: 30px;
  margin-bottom: 10px;
`;

const DeleteButton = styled(Button)`
  margin-bottom: 12px;
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
