import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import IClientHTTP from "./interfaces/IClientHTTP"

export default class ClientHTTP implements IClientHTTP {
  async get(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse> {
    return axios.get(url, options)
  }

  async post(
    url: string,
    body: unknown,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return axios.post(url, body, options)
  }

  async put(
    url: string,
    body: unknown,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return axios.put(url, body, options)
  }

  async delete(
    url: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return axios.delete(url, options)
  }
}
