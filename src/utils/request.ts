import { baseUrl } from '@/constants/global';
import axios, { AxiosRequestConfig } from 'axios';

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

const request = <T>(config: AxiosRequestConfig): Promise<BaseResponse<T>> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .request<BaseResponse<T>>(config)
      .then(res => {
        const { data } = res;
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default request;
