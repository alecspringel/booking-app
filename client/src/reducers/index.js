import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import eventReducer from "./eventReducers";
import bookReducers from "./bookReducers";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  events: eventReducer,
  book: bookReducers,
});
