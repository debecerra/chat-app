import axios from 'axios';

const BASE_URL = 'http://localhost:5000';
const API = axios.create({ baseURL: BASE_URL });

// make backend API request to root
export const get = () => API.get('/');

/*
 * Authentication
 */

// make backend API request to register a user
export const register = () => API.post('/register');

// make backend API request to login a user
export const login = () => API.post('/login');

// make backend API request to logout a user
export const logout = () => API.post('/logout');
