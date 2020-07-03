import {
  SET_BOOKING_SCHEDULE,
  SCHEDULE_LOADING,
  SET_SCHEDULE_LIST,
  SET_EDIT_SCHEDULE,
} from "../actions/types";

const initialState = {
  monthSchedule: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SCHEDULE_LIST:
      return {
        ...state,
        all: action.payload,
      };
    case SET_EDIT_SCHEDULE:
      return {
        ...state,
        edit: action.payload,
        loading: false,
      };
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
