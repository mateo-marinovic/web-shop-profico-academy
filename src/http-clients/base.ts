import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export class BaseHttpClient {
  private instance: AxiosInstance;

  public constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:3004",
    });
  }

  public async get<T>(url: string): Promise<T> {
    const { data } = await this.instance.get(url);
    return data;
  }

  public async post<T, K>(url: string, body: T): Promise<K> {
    const { data } = await this.instance.post(url, body);
    return data;
  }

  public async patch<T, K>(
    url: string,
    body: T,
    options: AxiosRequestConfig
  ): Promise<K> {
    const { data } = await this.instance.patch(url, body, options);
    return data;
  }
}
