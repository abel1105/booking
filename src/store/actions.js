export const SET_ROOMS = 'SET_ROOMS';
export const SET_ROOM = 'SET_ROOM';
export const SET_BOOKING = 'SET_BOOKING';

export const setRoomsWithData = rooms => ({
  type: SET_ROOMS,
  payload: {
    rooms
  }
});

export const setRoomWithData = room => ({
  type: SET_ROOM,
  payload: {
    room
  }
});

export const setBookingWithData = booking => ({
  type: SET_BOOKING,
  payload: {
    booking
  }
});
