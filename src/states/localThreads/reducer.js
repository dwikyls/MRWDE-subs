import { ActionType } from './action';

function localThreadsReducer(localThreads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_LOCAL_THREADS:
      return action.payload.localThreads;
    case ActionType.ADD_LOCAL_THREAD:
      return [action.payload.thread, ...localThreads];
    default:
      return localThreads;
  }
}

export default localThreadsReducer;
