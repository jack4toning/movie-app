import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './features/modalSlice';
import formReducer from './features/formSlice';

export default configureStore({
  reducer: {
    modal: modalReducer,
    form: formReducer,
  },
});
