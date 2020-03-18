import { combineReducers } from "redux";

const getCurrentUserReducer = (state = {}, action) => {
  if (action.type === "GET_CURRENT_USER") {
    return action.payload;
  }
  return state;
};

export default combineReducers({
  currentUserRedux: getCurrentUserReducer
});
