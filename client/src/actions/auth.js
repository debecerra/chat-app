import { AUTHENTICATE, LOGOUT, FETCH_USER_DATA } from '../constants/actionTypes';
import * as api from '../api/rest';
import socket from '../services/socket';

/**
 * Returns an action that makes the request to register a new user.
 * @param {object} formData the fields of the register form
 * @param {History} router history instance used to navigate the application
 * @returns the action function
 */
export const register = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);

    // reconnect socket to update authentication
    socket.disconnect();
    socket.connect();

    // update redux store
    dispatch({ type: AUTHENTICATE, data });
    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

/**
 * Returns an action that makes a request to login a user
 * @param {object} formData the fields of the login form
 * @param {History} router history instance used to navigate the application
 * @returns the action function
 */
export const login = (formData, router) => async (dispatch) => {
  try {
    const response = await api.login(formData);

    // reconnect socket to update authentication
    socket.disconnect();
    socket.connect();

    // update redux store
    dispatch({ type: AUTHENTICATE, data: response.data });
    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

/**
 * Returns an action that makes a request for profile data of user that is authenticated.
 * @returns the action function
 */
export const fetchCurrentUser = () => async (dispatch) => {
  try {
    const { data } = await api.getUser();
    dispatch({ type: FETCH_USER_DATA, data });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Returns the action that makes the request to logout a user
 * @returns the action function
 */
export const logout = () => async (dispatch) => {
  try {
    await api.logout();

    // reconnect socket to update authentication
    socket.disconnect();
    socket.connect();

    // update redux store
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.log(error);
  }
};
