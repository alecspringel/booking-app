import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import bookReducers from "./bookReducers";
import scheduleReducers from "./scheduleReducers";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  book: bookReducers,
  schedule: scheduleReducers,
});
