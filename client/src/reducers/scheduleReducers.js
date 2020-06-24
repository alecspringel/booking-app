import { SET_BOOKING_SCHEDULE } from "../actions/types";

const initialState = {
  bookingSchedule: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_BOOKING_SCHEDULE:
      return {
        ...state,
        bookingSchedule: action.payload,
      };
    default:
      return state;
  }
}
