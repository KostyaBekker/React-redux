import { LOGIN, AUTH } from '../actionTypes';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      // console.log('reducer', action.payload);
      return action.payload;
    }
    case AUTH: {
      // console.log('reducer', action.payload);
      return action.payload;
    }
    default:
      return state;
  }
};
