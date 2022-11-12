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
      genres: string[];
      runtime: number;
      overview: string;
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
            genres: never[];
            runtime: number;
            overview: string;
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
      genres: [],
      runtime: 0,
      overview: '',
    },
  },
  setModalState: () => {},
};

export default createContext(defaultContext);
