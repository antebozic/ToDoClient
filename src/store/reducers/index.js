import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import todos from "./todos";

const rootReducer = combineReducers({
  currentUser,
  errors,
  todos
});

export default rootReducer;