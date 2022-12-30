const ActionType = {
  RECEIVE_LOCAL_THREADS: 'RECEIVE_LOCAL_THREADS',
  ADD_LOCAL_THREAD: 'ADD_LOCAL_THREAD',
};

function receiveLocalThreadsActionCreator(localThreads) {
  return {
    type: ActionType.RECEIVE_LOCAL_THREADS,
    payload: {
      localThreads,
    },
  };
}

function addLocalThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_LOCAL_THREAD,
    payload: {
      thread,
    },
  };
}

export {
  ActionType,
  receiveLocalThreadsActionCreator,
  addLocalThreadActionCreator,
};
