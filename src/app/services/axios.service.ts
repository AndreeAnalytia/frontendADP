import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import AuthAPI from './auth.service';
import TokenService from './token.service';
import {ENV} from '../app.config';
const authAPI = new AuthAPI();

export default class Axios {
  private static instance: Axios;

  private request: AxiosInstance;

  constructor() {
    this.request = axios.create({
      baseURL: ENV.HOST,
      headers: { 'Content-Type': 'application/json' }
    });

    // To add token in every request
    this.request.interceptors.request.use((config: AxiosRequestConfig) => {
      const token = TokenService.getToken('ACCESS');
      if (config.headers) {
        config.headers['Authorization'] = token ? `Bearer ${token}` : '';
      }

      return config;
    });

    this.request.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest: AxiosRequestConfig & { _retry?: boolean } = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = TokenService.getToken('REFRESH') as string;
            await authAPI.refreshTokenAuth(refreshToken);
            return await this.request(originalRequest);
          } catch (err) {
            await authAPI.signout();
          }
        }

        return Promise.reject(error);
      }
    );
  }

  static getInstance(): AxiosInstance {
    if (!Axios.instance) {
      Axios.instance = new Axios();
    }

    return Axios.instance.request;
  }
}
