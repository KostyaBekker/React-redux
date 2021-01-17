
import {
  GETUSER,
  EDITUSER
} from './actionTypes';

async function postData(url = '', data = {}) {
  const token = JSON.parse(localStorage.getItem('appToken'));
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      origin: 'http://prozorro.mavinx.com',
      Authorization: token
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
  return await response.json();
}

// eslint-disable-next-line no-shadow
const getUser = (callBack) => {

  if (!localStorage.getItem('appToken')) {
    location.pathname = '/';
  } else {
    const user = JSON.parse(localStorage.getItem('appToken'));
    callBack(user);
  }

  const user = {};
  return {
    type: GETUSER,
    payload: user
  };
};

const editUser = (body, callBack) => {
  postData('https://prozorro.mavinx.com/api/test/edit-user', body)
    .then((data) => {
      if (data.status) {
        callBack();
      }
      // console.log(data);
    });

  const user = {};
  return {
    type: EDITUSER,
    payload: user
  };
};

export default { getUser, editUser };
