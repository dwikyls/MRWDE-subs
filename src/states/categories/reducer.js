import { ActionType } from './action';

function categoriesReducer(categories = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_CATEGORIES:
      return action.payload.threads
        .map((thread) => thread.category)
        .filter((value, index, self) => self.indexOf(value) === index);
    case ActionType.ADD_THREAD:
      if (!categories.includes(action.payload.category)) {
        return [action.payload.category, ...categories];
      }

      return categories;
    default:
      return categories;
  }
}

export default categoriesReducer;
