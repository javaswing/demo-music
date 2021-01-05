import axios, { AxiosRequestConfig, Method } from 'axios';
export type RequestOption = {
  method?: Method;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any;
  url: string;
};

function genAxiosInstance(config?: AxiosRequestConfig) {
  return axios.create({
    headers: {
      // Authorization: token, // need to set token here
      Accept: 'application/json; charset=utf-8; text/plain;',
    },
    ...config,
  });
}

const axiosInstance = genAxiosInstance();

axiosInstance.interceptors.request.use(() => {});

export default axiosInstance;
