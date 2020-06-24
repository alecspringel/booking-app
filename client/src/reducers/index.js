import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import eventReducer from "./eventReducers";
import bookReducers from "./bookReducers";
import scheduleReducers from "./scheduleReducers";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  events: eventReducer,
  book: bookReducers,
  schedule: scheduleReducers,
});
