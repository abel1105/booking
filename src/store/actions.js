export const SET_ROOMS = 'SET_ROOMS';

export const setRoomsWithData = rooms => ({
  type: SET_ROOMS,
  payload: {
    rooms
  }
});
