import { createContext, Dispatch, SetStateAction } from 'react';

type defaultContextType = {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>> | (() => void);
};

const defaultContext: defaultContextType = {
  modalOpen: false,
  setModalOpen: () => {},
};

export default createContext(defaultContext);
