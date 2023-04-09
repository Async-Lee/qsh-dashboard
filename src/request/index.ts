import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";
import useEnv from "@/hooks/use-env";
import { EnumContentType } from "@/enums/EnumHttpConfig";
import { AxiosCancel } from "./cancel";
import { AxiosRetry } from "./retry";

interface axiosConfig {
  successMessage?: boolean;
  errorMessage?: boolean;
  cancelSame?: boolean;
  retryCount?: number;
  isRetry?: boolean;
  loading?: boolean;
}

const defaultConfig: axiosConfig = {
  successMessage: false,
  errorMessage: true,
  cancelSame: false,
  isRetry: false,
  retryCount: 3,
  loading: true
};

const { VITE_BASE_API } = useEnv();

const axiosCancel = new AxiosCancel();

const service: AxiosInstance = axios.create({
  baseURL: VITE_BASE_API,
  timeout: 10 * 1000, // 请求超时时间
  headers: { "Content-Type": EnumContentType.JSON }
});

service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // @ts-ignore
  const { cancelSame } = config.requestOptions;
  if (cancelSame) {
    axiosCancel.addPending(config);
  }

  // if (getToken) {
  //     config!.headers!.Authorization = unref(`Bearer ${getToken}`) ?? "";
  // }

  return config;
});

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const data: QSH.HttpResult = response.data;
    axiosCancel.removePending(response.config);
    if (data.success) {
      return data?.data;
    } else {
      return Promise.reject(data);
    }
  },
  (err) => {
    if (err.code === "ERR_CANCELED") return;
    const { isRetry, retryCount } = err.config.requestOptions;
    if (isRetry && (err.config._retryCount || 0) < retryCount) {
      const axiosRetry = new AxiosRetry();
      axiosRetry.retry(service, err);
      return;
    }
    axiosCancel.removePending(err.config || {});
    return Promise.reject(err.response);
  }
);

const request = {
  get<T = any>(url: string, data?: any, config?: axiosConfig): Promise<T> {
    return request.request("GET", url, { params: data }, config);
  },
  post<T = any>(url: string, data?: any, config?: axiosConfig): Promise<T> {
    return request.request("POST", url, { data }, config);
  },
  put<T = any>(url: string, data?: any, config?: axiosConfig): Promise<T> {
    return request.request("PUT", url, { data }, config);
  },
  delete<T = any>(url: string, data?: any, config?: axiosConfig): Promise<T> {
    return request.request("DELETE", url, { params: data }, config);
  },
  request<T = any>(method = "GET", url: string, data?: any, config?: axiosConfig): Promise<T> {
    const options = Object.assign({}, defaultConfig, config);
    return new Promise((resolve, reject) => {
      service({ method, url, ...data, requestOptions: options })
        .then((res) => {
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          reject(e);
        })
        .finally(() => {
        });
    });
  }
};

export default request;
