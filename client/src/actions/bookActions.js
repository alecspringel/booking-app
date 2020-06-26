import axios from "axios";
import { GET_ERRORS, SET_BOOKING_PAGE } from "./types";

// Login - get user token
export const getBookingPage = (userURL) => (dispatch) => {
  axios
    .get("/api/book/" + userURL)
    .then((res) => {
      dispatch(setBookingPage(res.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
};

export const bookMeeting = (link, start, end) => (dispatch) => {
  axios
    .post("/api/book/create", { link, start, end })
    .then((res) => {
      //dispatch(setBookingPage(res.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
};

export const setBookingPage = (userData) => {
  return {
    type: SET_BOOKING_PAGE,
    payload: userData,
  };
};
