import { ActionType } from './action';

function commentsReducer(comments = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_COMMENTS:
      return action.payload.comments;
    case ActionType.ADD_COMMENT:
      return [action.payload.comment, ...comments];
    case ActionType.CLEAR_COMMENTS:
      return null;
    case ActionType.TOGGLE_LIKE_COMMENT:
      return comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          switch (action.payload.isUp) {
            case true:
              return {
                ...comment,
                upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                  ? comment.upVotesBy
                  : comment.upVotesBy.concat([action.payload.userId]),
                downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                  ? comment.downVotesBy.filter((id) => id !== action.payload.userId)
                  : comment.downVotesBy,
              };
            case false:
              return {
                ...comment,
                upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                  ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
                  : comment.upVotesBy,
                downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                  ? comment.downVotesBy
                  : comment.downVotesBy.concat([action.payload.userId]),
              };
            default:
              return {
                ...comment,
                upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),
                downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId),
              };
          }
        }

        return comment;
      });
    default:
      return comments;
  }
}

export default commentsReducer;
