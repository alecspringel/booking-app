import axios from "axios";
import {
  GET_ERRORS,
  SET_BOOKING_SCHEDULE,
  SCHEDULE_LOADING,
  SET_SCHEDULE_LIST,
} from "./types";
import { daysInMonth, addDays } from "../helpers/dateTime";

export const createSchedule = (title, description, duration) => (dispatch) => {
  const token = localStorage.getItem("jwtToken");
  const storedToken = {
    headers: {
      Authorization: token,
    },
  };
  console.log("sending");
  axios
    .post("/api/users/schedule/create", {
      title,
      description,
      duration,
    })
    .then((res) => {
      return res.data;
      //dispatch(setSchedule(res.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
};

export const getAllSchedules = () => (dispatch) => {
  console.log("sent");
  axios
    .get("/api/users/schedules")
    .then((res) => {
      dispatch(setScheduleList(res.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
  return true;
};

export const getSchedule = (userURL, scheduleTitle, start, end) => (
  dispatch
) => {
  dispatch(scheduleLoading());
  const params = {
    userURL,
    scheduleTitle,
    start,
    end,
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
  return true;
};

export const getMonthSchedule = (userURL, date, scheduleTitle = null) => (
  dispatch
) => {
  console.log("hello");
  dispatch(scheduleLoading());
  const title = scheduleTitle === null ? undefined : scheduleTitle;
  const params = {
    userURL,
    date,
    scheduleTitle: title,
    timezone: new Date().getTimezoneOffset(),
  };
  axios
    .get("/api/users/schedule/month", {
      params,
    })
    .then((res) => {
      console.log(res.data);
      dispatch(setSchedule(res.data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
};

export const setScheduleList = (scheduleList) => {
  return {
    type: SET_SCHEDULE_LIST,
    payload: scheduleList,
  };
};

export const setSchedule = (scheduleMonth) => {
  return {
    type: SET_BOOKING_SCHEDULE,
    payload: scheduleMonth,
  };
};

export const scheduleLoading = () => {
  return {
    type: SCHEDULE_LOADING,
  };
};
