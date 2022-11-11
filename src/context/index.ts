import { createContext, Dispatch, SetStateAction } from 'react';

type defaultContextType = {
  modalState: {
    modalOpen: {
      addModalOpen: boolean;
      editModalOpen: boolean;
      delModalOpen: boolean;
      infoModalOpen: boolean;
    };
    modalForm: {
      title: string;
      releaseDate: string;
      movieUrl: string;
      rating: number;
      genre: string[];
      runtime: number;
    };
  };
  setModalState:
    | Dispatch<
        SetStateAction<{
          modalOpen: {
            addModalOpen: boolean;
            editModalOpen: boolean;
            delModalOpen: boolean;
            infoModalOpen: boolean;
          };
          modalForm: {
            title: string;
            releaseDate: string;
            movieUrl: string;
            rating: number;
            genre: never[];
            runtime: number;
          };
        }>
      >
    | (() => void);
};

const defaultContext: defaultContextType = {
  modalState: {
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
      genre: [],
      runtime: 0,
    },
  },
  setModalState: () => {},
};

export default createContext(defaultContext);
