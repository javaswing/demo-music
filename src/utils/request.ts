import { baseUrl } from '@/constants/global';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

function genAxiosInstance(config?: AxiosRequestConfig) {
  return axios.create({
    baseURL: baseUrl,
    headers: {
      // Authorization: token, // need to set token here
      Accept: 'application/json; charset=utf-8; text/plain;',
    },
    ...config,
  });
}

const axiosInstance = genAxiosInstance();

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.data.code !== 200) {
      window.alert('数据返回有误');
      return Promise.reject(res);
    }
    return Promise.resolve(res);
  },
  (error: AxiosError) => {
    console.log('promise error:' + error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
