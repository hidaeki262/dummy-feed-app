import * as types from '../types';
import * as authAPI from '../../api/authAPI';

// Login actions
const loginStart = () => ({
  type: types.LOGIN_START,
});

const loginSuccess = user => ({
  type: types.LOGIN_SUCCESS,
  payload: user,
});

const loginFailure = error => ({
  type: types.LOGIN_FAILURE,
  payload: error,
});

export const login = (email, password) => async dispatch => {
  try {
    dispatch(loginStart());
    const user = await authAPI.login(email, password);
    dispatch(loginSuccess(user));
  } catch (error: any) {
    dispatch(loginFailure(error.message));
  }
};

// Logout actions
export const logout = () => ({
  type: types.LOGOUT_REQUEST,
});
