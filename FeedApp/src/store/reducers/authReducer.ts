import * as types from '../types';

const initialState = {
  user: null,
  loading: false,
  error: null,
  isLoggedIn: false,
};

const authReducer = (
  state = initialState,
  action: {type: any; payload: any},
) => {
  switch (action.type) {
    case types.LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        isLoggedIn: true,
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isLoggedIn: false,
      };
    case types.LOGOUT_REQUEST:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
