import axios from "axios";
import { GET_ERRORS, SET_BOOKING_SCHEDULE } from "./types";

export const createSchedule = (title, newSchedule, interval) => (dispatch) => {
  const token = localStorage.getItem("jwtToken");
  const storedToken = {
    headers: {
      Authorization: token,
    },
  };
  axios
    .post("/api/users/schedule/create", {
      title,
      newSchedule,
      interval,
      storedToken,
    })
    .then((res) => {
      //dispatch(setSchedule(res.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
};

export const getSchedule = (userURL, date, scheduleTitle = null) => (
  dispatch
) => {
  const title = scheduleTitle === null ? undefined : scheduleTitle;
  const params = {
    userURL,
    date,
    scheduleTitle: title,
    timezone: new Date().getTimezoneOffset(),
  };
  axios
    .get("/api/users/schedule", {
      params,
    })
    .then((res) => {
      dispatch(setSchedule(res.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
};

export const setSchedule = (schedule) => {
  return {
    type: SET_BOOKING_SCHEDULE,
    payload: schedule,
  };
};
