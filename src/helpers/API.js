const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
};

export const getRooms = () => {
  return fetch('https://challenge.thef2e.com/api/thef2e2019/stage6/rooms', {
    headers
  }).then(res => res.json());
};
