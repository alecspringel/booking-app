import { SET_BOOKING_SCHEDULE, SCHEDULE_LOADING } from "../actions/types";

const initialState = {
  monthSchedule: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_BOOKING_SCHEDULE:
      return {
        ...state,
        monthSchedule: action.payload,
        loading: false,
      };
    case SCHEDULE_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
