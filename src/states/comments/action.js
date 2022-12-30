import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_COMMENTS: 'RECEIVE_COMMENTS',
  CLEAR_COMMENTS: 'CLEAR_COMMENTS',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_LIKE_COMMENT: 'TOGGLE_LIKE_COMMENT',
};

function receiveCommentsActionCreator(comments) {
  return {
    type: ActionType.RECEIVE_COMMENTS,
    payload: {
      comments,
    },
  };
}

function addCommentActionCreator({ comment }) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function clearCommentsActionCreator() {
  return {
    type: ActionType.CLEAR_COMMENTS,
  };
}

function toggleLikeCommentActionCreator({
  commentId, userId, isUp,
}) {
  return {
    type: ActionType.TOGGLE_LIKE_COMMENT,
    payload: {
      commentId,
      userId,
      isUp,
    },
  };
}

function asyncAddComment({ content, threadId }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const comment = await api.createComment({ content, threadId });
      dispatch(addCommentActionCreator({ comment }));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncToogleLikeComment({ threadId, commentId, isUp }) {
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

      dispatch(toggleLikeCommentActionCreator({ commentId, userId: authUser.id, isUp }));
      await api.toggleLikeComment({ threadId, commentId, type });
    } catch (error) {
      alert(error.message);
      dispatch(toggleLikeCommentActionCreator({ commentId, userId: authUser.id, isUp }));
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveCommentsActionCreator,
  clearCommentsActionCreator,
  addCommentActionCreator,
  toggleLikeCommentActionCreator,
  asyncAddComment,
  asyncToogleLikeComment,
};
