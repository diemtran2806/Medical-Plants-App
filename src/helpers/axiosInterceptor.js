import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import envs from '../config/env';
//import {LOGOUT} from '../constants/routeNames';
//import {navigate} from '../navigations/SideMenu/RootNavigator';

let headers = {};

axios.defaults.rejectUnauthorized = false;

const axiosInstance = axios.create({
  baseURL: 'http://172.20.10.3:8000/',
  //baseURL: 'http://10.0.2.2:8000/',
  //baseURL: 'https://reqres.in/api',
  //baseURL: 'https://fakestoreapi.com/',
  headers,
});

axiosInstance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response =>
    new Promise((resolve, reject) => {
      resolve(response);
    }),
  error => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    if (error.response.status === 403) {
      //navigate(LOGOUT, {tokenExpired: true});
    } else {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  },
);

export default axiosInstance;
