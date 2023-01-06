import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads];
    case ActionType.TOGGLE_LIKE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          if (action.payload.isUp === true) {
            return {
              ...thread,
              upVotesBy: thread.upVotesBy.includes(action.payload.userId)
                ? thread.upVotesBy
                : thread.upVotesBy.concat([action.payload.userId]),
              downVotesBy: thread.downVotesBy.includes(action.payload.userId)
                ? thread.downVotesBy.filter((id) => id !== action.payload.userId)
                : thread.downVotesBy,
            };
          }

          if (action.payload.isUp === false) {
            return {
              ...thread,
              upVotesBy: thread.upVotesBy.includes(action.payload.userId)
                ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
                : thread.upVotesBy,
              downVotesBy: thread.downVotesBy.includes(action.payload.userId)
                ? thread.downVotesBy
                : thread.downVotesBy.concat([action.payload.userId]),
            };
          }

          return {
            ...thread,
            upVotesBy: thread.upVotesBy.filter((id) => id !== action.payload.userId),
            downVotesBy: thread.downVotesBy.filter((id) => id !== action.payload.userId),
          };
        }

        return thread;
      });
    case ActionType.FILTER_THREADS:
      return action.payload.threads
        .filter((thread) => thread.category.includes(action.payload.category));
    default:
      return threads;
  }
}

export default threadsReducer;
