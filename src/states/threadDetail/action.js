import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { receiveCommentsActionCreator } from '../comments/action';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  TOGGLE_LIKE_THREAD_DETAIL: 'TOGGLE_LIKE_THREAD_DETAIL',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function toggleLikeThreadDetailActionCreator({ userId, isUp }) {
  return {
    type: ActionType.TOGGLE_LIKE_THREAD_DETAIL,
    payload: {
      userId,
      isUp,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
      dispatch(receiveCommentsActionCreator(threadDetail.comments));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncToogleLikeThreadDetail(isUp) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    let type = 'up-vote';
    const { authUser, threadDetail } = getState();

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
      dispatch(toggleLikeThreadDetailActionCreator({ userId: authUser.id, isUp }));

      await api.toggleLikeThread(threadDetail.id, type);
    } catch (error) {
      alert(error.message);
      dispatch(toggleLikeThreadDetailActionCreator({ userId: authUser.id, isUp }));
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  toggleLikeThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncToogleLikeThreadDetail,
  clearThreadDetailActionCreator,
};
