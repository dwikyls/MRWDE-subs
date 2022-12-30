import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import isPreloadReducer from './isPreload/reducer';
import threadsReducer from './threads/reducer';
import usersReducer from './users/reducer';
import authUserReducer from './authUser/reducer';
import threadDetailReducer from './threadDetail/reducer';
import categoriesReducerReducer from './categories/reducer';
import leaderboardsReducer from './leaderboards/reducer';
import commentsReducer from './comments/reducer';
import localThreadsReducerReducer from './localThreads/reducer';

const store = configureStore({
  reducer: {
    threads: threadsReducer,
    localThreads: localThreadsReducerReducer,
    isPreload: isPreloadReducer,
    loadingBar: loadingBarReducer,
    users: usersReducer,
    authUser: authUserReducer,
    threadDetail: threadDetailReducer,
    categories: categoriesReducerReducer,
    leaderboards: leaderboardsReducer,
    comments: commentsReducer,
  },
});

export default store;
