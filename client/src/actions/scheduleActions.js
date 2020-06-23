import axios from "axios";

export const createMeeting = (newSchedule) => (dispatch) => {
  const token = localStorage.getItem("jwtToken")
  const storedToken = {
    headers: {
       Authorization: token
    }
  }
  axios
    .post("/api/user/createSchedule", {newSchedule, storedToken})
    .then((res) => {
      // dispatch(addEventToList(res.data));
      console.log(res.data)
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err,
      })
    );
};