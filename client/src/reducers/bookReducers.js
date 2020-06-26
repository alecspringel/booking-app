import { SET_BOOKING_PAGE } from "../actions/types";

const initialState = {
  user: {
    first: "",
    last: "",
  },
};

export default function (state = initialState, action) {
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
