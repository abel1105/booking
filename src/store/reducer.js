import { SET_ROOMS } from './actions';

const initialState = {
  rooms: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROOMS: {
      return {
        ...state,
        rooms: action.payload.rooms
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
