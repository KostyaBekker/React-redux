import { GETUSER, EDITUSER } from '../actionTypes';

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GETUSER: {
      // console.log('reducer', action.payload);
      return action.payload;
    }
    case EDITUSER: {
      // console.log('reducer', action.payload);
      return action.payload;
    }
    default:
      return state;
  }
};