import axios from 'axios';

const BASE_URL = 'http://localhost:5000';
const API = axios.create({ baseURL: BASE_URL });

// make backend API request to root
export const get = () => API.get('/');

/*
 * Authentication
 */

/** make backend API request to register a user */
export const register = (formData) => API.post('/auth/register', formData, { withCredentials: true });

/** make backend API request to login a user */
export const login = (formData) => API.post('/auth/login', formData, { withCredentials: true });

/** make backend API request to login a user with Google */
export const googleLogin = () => API.get('/auth/google');

/** make backend API request to logout a user */
export const logout = () => API.get('/auth/logout', { withCredentials: true });

export const getUser = () => API.get('/user', { withCredentials: true });
