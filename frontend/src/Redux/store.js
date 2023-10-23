import { configureStore } from '@reduxjs/toolkit';
import commentsReducers from './comment.reducer/comments.reducers';
import userReducers from './user.reducer/users.reducers';
import { REDUX_DEVTOOLS } from '../config/globals';
import postsReducers from './post.reducer/posts.reducers';

const store = configureStore({
  reducer: {
    comment: commentsReducers,
    user: userReducers,
    post: postsReducers,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: process.env.NODE_ENV !== 'production' ? REDUX_DEVTOOLS : false,
});

export default store;
