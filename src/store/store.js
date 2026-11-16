import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice.js';
import usersReducer from './usersSlice.js';

export default configureStore({
  reducer: {
    todos: todosReducer,
    users: usersReducer
  }
});
