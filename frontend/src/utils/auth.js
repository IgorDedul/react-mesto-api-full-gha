import { checkResponse } from './utils';

export const BASE_URL = 'https://api.igord.nomoredomainsicu.ru';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};

export const authorize = (authData) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers,
    body: JSON.stringify(authData),
  }).then((res) => checkResponse(res));
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));
};