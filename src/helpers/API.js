import moment from 'moment';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
};

const BASE = 'https://challenge.thef2e.com/api/thef2e2019/stage6';

export const getRooms = () => {
  return fetch(`${BASE}/rooms`, {
    headers
  }).then(res => res.json());
};

export const getRoom = id => {
  return fetch(`${BASE}/room/${id}`, {
    headers
  }).then(res => res.json());
};

export const postRoom = (id, name, tel, start, end) => {
  const date = [];
  let totalDay = end.diff(start, 'days') + 1;
  for (let i = 0; i < totalDay; i++) {
    date.push(
      moment(start)
        .add(i, 'days')
        .format('Y-MM-DD')
    );
  }

  const data = {
    name,
    tel,
    date
  };
  return fetch(`${BASE}/room/${id}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  }).then(res => res.json());
};

export const deleteRooms = () => {
  return fetch(`${BASE}/rooms`, {
    method: 'DELETE',
    headers
  }).then(res => res.json());
};
