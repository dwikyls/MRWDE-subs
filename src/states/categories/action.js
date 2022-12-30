const ActionType = {
  RECEIVE_CATEGORIES: 'RECEIVE_CATEGORIES',
  ADD_CATEGORY: 'ADD_CATEGORY',
};

function receiveCategoriesActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_CATEGORIES,
    payload: {
      threads,
    },
  };
}

function addCategoryActionCreator(category) {
  return {
    type: ActionType.ADD_CATEGORY,
    payload: {
      category,
    },
  };
}

export {
  ActionType,
  receiveCategoriesActionCreator,
  addCategoryActionCreator,
};
