import React, {useEffect} from 'react';
import axios from 'axios';

const useHttpRequest = () => {
    const axiosInstance = axios.create({
        baseURL: 'https://google.com'

    });

    const axiosInstanceRequestionInterceptorId =
              axiosInstance.interceptors.request.use(req => {
                  console.log(req);
                  if (!req.url.endsWith('/login'))
                      req.headers['Authorization'] = localStorage.getItem('token') || '';
                  return req;
              });
    const axiosInstanceResponseInterceptorId =
              axiosInstance.interceptors.response.use(response => {
                  //todo: sign out user
                  if (response.status !== 200)
                      alert('خطایی رخ داده است ...');
                  return response;
              });

    useEffect(() => {

        return () => {
            //will unmount
            axiosInstance.interceptors.response.eject(axiosInstanceResponseInterceptorId);
            axiosInstance.interceptors.request.eject(axiosInstanceRequestionInterceptorId);
        };
    }, []);

    return axiosInstance;
};

export default useHttpRequest;
