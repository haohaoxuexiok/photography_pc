import NetWorkRequest from "./request/index";
import localCache from "../utils/localStorage"

let BASEURL = "http://localhost:8000";
let TIMEOUT = 2000;

const axiosInstance = new NetWorkRequest({
  baseURL: BASEURL,
  timeout: TIMEOUT,
  showLoading: false,
  interceptors: {
    requestInterceptor: (config) => {
      const token = localCache.getCache('token')
      
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config;
    }, 
    requestInterceptorCatch: (err) => {
      return err;
    },
    responseInterceptor: (res) => {
      return res;
    },
    responseInterceptorCatch: (err) => {
      return err;
    },
  },
});

export default axiosInstance;
