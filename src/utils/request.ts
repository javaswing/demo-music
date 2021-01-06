import { baseUrl } from '@/constants/global';
import axios, { AxiosRequestConfig, Method } from 'axios';
/** 请求配置 */
export type RequestOption = {
  method?: Method;
  data?: any;
  params?: any;
  url: string;
};

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
  (res) => {
    if (res.status === 654) {
      // 百度云请求超时检测
      window.alert('请求超时！');
    }
    if (res.data.code !== 200) {
      window.alert('数据返回有误');
      return Promise.reject(res);
    }
    return res.data;
  },
  (error) => {
    console.log('promise error:' + error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
