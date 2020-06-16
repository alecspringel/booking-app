import { SET_BOOKING_PAGE } from "../actions/types";

const initialState = {
  user: {
    first: "",
    last: "",
  },
};

export default function (state = initialState, action) {
  console.log(action.payload);
  switch (action.type) {
    case SET_BOOKING_PAGE:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
