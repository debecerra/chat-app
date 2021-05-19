import { AUTH, LOGOUT } from '../constants/actionTypes';
import * as api from '../api';

/**
 * Returns the action that makes the request to register a new user.
 * @param {object} formData the fields of the register form
 * @param {History} router history instance used to navigate the application
 */
export const register = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);
    dispatch({ type: AUTH, data });
    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

/**
 * Returns the action that makes the request to login a user
 * @param {object} formData the fields of the login form
 * @param {History} router history instance used to navigate the application
 */
export const login = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    console.log('login action:\n', data);
    dispatch({ type: AUTH, data });
    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

/**
 * Returns the action that makes the request to login a user using Google Sign In
 * @param {History} router history instance used to navigate the application
 */
// export const googleLogin = (router) => async (dispatch) => {
//   try {
//     const { data } = await api.googleLogin();
//     dispatch({ type: AUTH, data });
//     router.push('/');
//   } catch (error) {
//     console.log(error);
//   }
// };

/**
 * Returns the action that makes the request to logout a user
 */
export const logout = () => async (dispatch) => {
  try {
    await api.logout();
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.log(error);
  }
};
