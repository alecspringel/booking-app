import {
  SET_EVENT_LIST,
  ADD_EVENT_TO_LIST
} from "../actions/types";


export default function(state = [], action) {
  switch (action.type) {
    case SET_EVENT_LIST:
      return {
        ...state,
        events: action.payload
      };
    case ADD_EVENT_TO_LIST:
      return {
        ...state,
        events: [action.payload, ...state.events]
      };
    default:
      return state;
  }
}