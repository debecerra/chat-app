/**
 * Contains thunk action creators relating to authentication.
 */

import socket from '../services/socket';
import * as AuthAPI from '../api/rest';

import {
  AUTHENTICATE,
  LOGOUT,
  FETCH_USER_DATA,
} from '../constants/actionTypes';

/**
 * Thunk action creator that returns thunk function that makes an API request to register
 * a new user.
 *
 * @param {object} formData the fields of the register form
 * @returns {Function} The thunk function/action
 */
export const register = (formData) => async (dispatch) => {
  try {
    const { data } = await AuthAPI.register(formData);

    // reconnect socket to update authentication
    socket.disconnect();
    socket.connect();

    // update redux store
    dispatch({ type: AUTHENTICATE, data });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Thunk action creator that returns thunk function that makes an API request to login a user.
 *
 * @param {object} formData the fields of the login form
 * @returns {Function} The thunk function/action
 */
export const login = (formData) => async (dispatch) => {
  try {
    const response = await AuthAPI.login(formData);

    // reconnect socket to update authentication
    socket.disconnect();
    socket.connect();

    // update redux store
    dispatch({ type: AUTHENTICATE, data: response.data });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Thunk action creator that returns thunk function that requests profile data of user that is
 * currently authenticated.
 *
 * @returns {Function} The thunk function/action
 */
export const fetchCurrentUser = () => async (dispatch) => {
  try {
    const { data } = await AuthAPI.getUser();
    dispatch({ type: FETCH_USER_DATA, data });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Thunk action creator that returns thunk function that makes an API request to logout a user.
 *
 * @returns {Function} The thunk function/action
 */
export const logout = () => async (dispatch) => {
  try {
    await AuthAPI.logout();

    // reconnect socket to update authentication
    socket.disconnect();
    socket.connect();

    // update redux store
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.log(error);
  }
};
