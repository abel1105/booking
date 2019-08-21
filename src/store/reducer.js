import { SET_BOOKING, SET_ROOM, SET_ROOMS } from './actions';

const initialState = {
  rooms: [],
  room: {},
  booking: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROOMS: {
      return {
        ...state,
        rooms: action.payload.rooms
      };
    }
    case SET_ROOM: {
      return {
        ...state,
        room: action.payload.room
      };
    }
    case SET_BOOKING: {
      return {
        ...state,
        booking: action.payload.booking
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
