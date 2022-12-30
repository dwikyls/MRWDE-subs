import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_LIKE_THREAD: 'TOGGLE_LIKE_THREAD',
  FILTER_THREADS: 'FILTER_THREADS',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function toggleLikeThreadActionCreator({ threadId, userId, isUp }) {
  return {
    type: ActionType.TOGGLE_LIKE_THREAD,
    payload: {
      threadId,
      userId,
      isUp,
    },
  };
}

function filterThreadActionCreator(category, threads) {
  return {
    type: ActionType.FILTER_THREADS,
    payload: {
      category,
      threads,
    },
  };
}

function asyncAddThread({ title, body, category = '' }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncToogleLikeThread(threadId, isUp) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    let type = 'up-vote';
    const { authUser } = getState();

    if (!isUp) {
      type = 'down-vote';
    }

    if (isUp == null) {
      type = 'neutral-vote';
    }

    try {
      if (!authUser) {
        throw new Error('anda harus login terlebih dahulu!');
      }

      dispatch(toggleLikeThreadActionCreator({ threadId, userId: authUser.id, isUp }));
      await api.toggleLikeThread(threadId, type);
    } catch (error) {
      alert(error.message);
      dispatch(toggleLikeThreadActionCreator({ threadId, userId: authUser.id }));
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  asyncAddThread,
  asyncToogleLikeThread,
  filterThreadActionCreator,
};
