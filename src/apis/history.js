import axios from 'axios';

export const getHistoryRequest = (limit, offset) => axios.get(`/history/?limit=${limit}&offset=${offset}`);
