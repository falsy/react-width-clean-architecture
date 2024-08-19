import { AxiosRequestConfig, AxiosResponse } from "axios"

export default interface IClientHTTP {
  get(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse>
  post<T>(
    url: string,
    body: T,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse>
  put<T>(
    url: string,
    body: T,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse>
  delete(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse>
}
