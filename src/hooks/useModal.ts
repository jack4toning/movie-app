import { useReducer } from 'react';

export type ModalState = {
  modalOpen: ModalOpen;
  modalForm: ModalForm;
};

export const initialState: ModalState = {
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
};

type ModalOpen = {
  addModalOpen: boolean;
  editModalOpen: boolean;
  delModalOpen: boolean;
  infoModalOpen: boolean;
};

type ModalForm = {
  title: string;
  releaseDate: string;
  movieUrl: string;
  rating: number;
  genres: string[];
  runtime: number;
  overview: string;
};

type ModalTypes = 'add' | 'edit' | 'del' | 'info';

export type ModalAction =
  | { type: 'openModal'; payload: ModalTypes }
  | { type: 'closeModal'; payload: ModalTypes }
  | { type: 'clearModalForm' }
  | { type: 'fillModalForm'; payload: ModalForm };

const useModal = () => {
  const modalReducer = (prevState: ModalState, action: ModalAction) => {
    let propName;

    switch (action.type) {
      case 'openModal':
        propName = action.payload + 'ModalOpen';
        return {
          ...prevState,
          modalOpen: { ...prevState.modalOpen, [propName]: true },
        };
      case 'closeModal':
        propName = action.payload + 'ModalOpen';
        return {
          ...prevState,
          modalOpen: { ...prevState.modalOpen, [propName]: false },
        };
      case 'clearModalForm':
        return {
          ...prevState,
          modalForm: {
            title: '',
            releaseDate: '',
            movieUrl: '',
            rating: 0,
            genres: [],
            runtime: 0,
            overview: '',
          },
        };
      case 'fillModalForm':
        const {
          title,
          releaseDate,
          movieUrl,
          rating,
          genres,
          runtime,
          overview,
        } = action.payload;
        return {
          ...prevState,
          modalForm: {
            title,
            releaseDate,
            movieUrl,
            rating,
            genres,
            runtime,
            overview,
          },
        };
      default:
        throw new Error('Bad action!');
    }
  };

  const [modalState, dispatch] = useReducer(modalReducer, initialState);
  return { modalState, dispatch };
};

export default useModal;
