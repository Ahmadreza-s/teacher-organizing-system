import axios from 'axios';

export const loginRequest = (username, password) => axios.post('/auth/login/', {username, password});
