import { AUTH, LOGOUT } from '../constants/actionTypes';
import * as api from '../api';

export const register = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);
    dispatch({ type: AUTH, data });
    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

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

export const googleLogin = (router) => async (dispatch) => {
  try {
    const { data } = await api.googleLogin();
    dispatch({ type: AUTH, data });
    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await api.logout();
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.log(error);
  }
};
