import { configureStore } from '@reduxjs/toolkit';
import autherReducer from '../Auther/Store/autherSliceData';

export default configureStore({
  reducer: {
    auther: autherReducer,
  },
});
