import { useState } from 'react';

const useModal = () => {
  const [modalState, setModalState] = useState({
    modalOpen: {
      addModalOpen: false,
      editModalOpen: false,
      delModalOpen: false,
      infoModalOpen: false,
    },
    modalForm: {
      title: '',
      releaseDate: '',
      movieUrl: '',
      rating: 0,
      genres: [],
      runtime: 0,
      overview: '',
    },
  });
  return { modalState, setModalState };
};

export default useModal;
