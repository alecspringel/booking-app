import axios from "axios";
import { GET_ERRORS } from "./types";

export const createSchedule = (newSchedule) => (dispatch) => {
  const token = localStorage.getItem("jwtToken");
  const storedToken = {
    headers: {
      Authorization: token,
    },
  };
  axios
    .post("/api/users/schedule/create", { newSchedule, storedToken })
    .then((res) => {
      //dispatch(setSchedule(res.data));
      console.log("hello");
      console.log(res.data);
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
};
