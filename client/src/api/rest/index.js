import axios from 'axios';

const BASE_URL = 'http://localhost:5000';
const API = axios.create({ baseURL: BASE_URL });

// Makes the backend API request GET '/'
export const get = () => API.get('/');

/*
 * Authentication
 */

/** Makes the backend API request to register a user */
export const register = (formData) => API.post('/auth/register', formData, { withCredentials: true });

/** Makes the backend API request to login a user */
export const login = (formData) => API.post('/auth/login', formData, { withCredentials: true });

/** Makes the backend API request to logout a user */
export const logout = () => API.get('/auth/logout', { withCredentials: true });

/*
 * Users
 */

/** Makes the backend API request to get user profile data */
export const getUser = () => API.get('/users', { withCredentials: true });
