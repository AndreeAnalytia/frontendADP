import axios, { AxiosInstance } from 'axios';
import TokenService from './token.service';
const manager = new TokenService();
import {ENV} from '../app.config'

export default class AuthAPI {
  private request: AxiosInstance;

  constructor() {
    this.request = axios.create({
      baseURL: ENV.HOST,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  signin = async (email:string, password:string) => {
    const response = await this.request.post<any>(
      '/sign-in',
      {email, password}
    );

    const tokens = response.data.data;
    await manager.getUser(tokens);
    await manager.setTokens(tokens);
    TokenService.getDataFromToken() as any;
    return tokens;
  };

  signout = async () => {
    TokenService.removeTokens();
  };

  refreshTokenAuth = async (refreshToken: string) => {
    const response = await this.request.post(
      '/refresh-token',
      { refreshToken }
    );

    const tokens = response.data.data;
    manager.setTokens(tokens);
    return TokenService.getDataFromToken() as any;
  };

}
