import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useNavigate } from "react-router-dom";

interface interceptorsType<T = AxiosResponse> {
  requestInterceptor?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (config: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}

interface AxiosRequestConfigs<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: interceptorsType<T>;
  showLoading?: boolean;
}

class NetWorkRequest {
  instance: AxiosInstance;
  interceptors?: interceptorsType;
  Loading?: any;
  showLoading?: boolean;

  constructor(config: AxiosRequestConfigs) {
    this.instance = axios.create(config);

    this.interceptors = config.interceptors;

    this.showLoading = config.showLoading ? config.showLoading : false;

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    this.instance.interceptors.request.use(
      (config) => {
        // if (this.showLoading) {
        //   this.Loading = ElLoading.service({
        //     lock: true,
        //     text: "正在请求数据....",
        //     background: "rgba(0, 0, 0, 0.5)",
        //   });
        // }
        return config;
      },
      (err) => {
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (config) => {
       
        if (config.data.status === 401) {
          // 清除本地存储的 token 和用户信息
          localStorage.removeItem('token');
          localStorage.removeItem('userInfo');
          
          // 跳转到登录页面
          window.location.href = '#/login'; // 

        }
        this.Loading?.close();
        return config.data;
      },
      (err) => {
       
        
        this.Loading?.close();
        return err;
      }
    );
  }

  request<T>(config: AxiosRequestConfigs<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config as any);
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  get<T = any>(config: AxiosRequestConfigs<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }

  post<T = any>(config: AxiosRequestConfigs<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }

  delete<T = any>(config: AxiosRequestConfigs<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }

  patch<T = any>(config: AxiosRequestConfigs<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
}

export default NetWorkRequest;
