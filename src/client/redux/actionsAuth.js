
import {
  LOGIN,
  AUTH,
} from './actionTypes';

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      origin: 'http://prozorro.mavinx.com'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
  return await response.json();
}

// eslint-disable-next-line no-shadow
const login = (body, callBack) => {
  postData('https://prozorro.mavinx.com/api/test/login', body)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('appToken', JSON.stringify(data.token));
        callBack();
      }
    });
  return {
    type: LOGIN,
    payload: login
  };
};

const auth = (body) => {

  postData('https://prozorro.mavinx.com/api/test/register', body)
    .then((data) => {
      console.log(data);
    });

  return {
    type: AUTH,
    payload: auth
  };
};

export default { login, auth };
