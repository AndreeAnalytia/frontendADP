import { AxiosInstance } from 'axios';
import Axios from './axios.service';
import { Router } from '@angular/router';
import TokenService from './token.service';

export default class ClientAPI {
  private request: AxiosInstance;

  constructor(private routes: Router) {
    this.request = Axios.getInstance();
  }
  getUserClaveSol = async (userId: string, page: number, search?: string) => {
    try {
      const response = await this.request.get('/get-users-clave-sol', {
        params: { pageSize: 10, page, search, userId },
      });
      return response.data;
    } catch (error: any) {
      this.errorMessage(error);
    }
  };

  getUsers= async (page: number, search?: string) => {
    try {
      const response = await this.request.get('/get-users', {
        params: { pageSize: 10, page, search },
      });
      return response.data;
    } catch (error: any) {
      this.errorMessage(error);
    }
  };

  getDataByUserClaveSol = async (
    ruc: string,
    date: string,
    page: number,
    tipo: string
  ) => {
    try {
      const response = await this.request.get('/data-by-user-sol', {
        params: { pageSize: 10, page, date, ruc, tipo },
      });
      return response.data;
    } catch (error: any) {
      this.errorMessage(error);
    }
  };

  userCreate = async (name: string, email: string, password: string) => {
    try {
      const response = await this.request.post(`/create`, {
        name,
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      this.errorMessage(error);
    }
  };

  forgotPassword = async (email: string) => {
    try {
      const response = await this.request.post(`/forgot-password`, {
        email
      });
      return response.data;
    } catch (error: any) {
      this.errorMessage(error);
    }
  };

  resetPassword = async (token: string, newPassword:string) => {
    try {
      const response = await this.request.post(`/reset-password/${token}`, {
        newPassword
      });
      return response.data;
    } catch (error: any) {
      this.errorMessage(error);
    }
  };

  userClaveSolCreate = async (
    name: string,
    username: string,
    password: string,
    ruc: string,
    userId: string,
    buy: boolean,
    sale: boolean,
    newquery:boolean,
    rh:boolean
  ) => {
    try {
      const response = await this.request.post(`/create-user-clave-sol`, {
        name,
        username,
        password,
        ruc,
        userId,
        buy,
        sale,
        newquery,
        rh
      });
      return response.data;
    } catch (error: any) {
      this.errorMessage(error);
    }
  };

  userUpdate = async (
    id: string,
    email: string,
    name: string,
    status: boolean,
    password: string,
    token:string
  ) => {
    try {
      const response = await this.request.put(`/update-user`, {
        id,
        name,
        email,
        status,
        password,
        token
      });
      return response.data;
    } catch (error: any) {
      this.errorMessage(error);
    }
  };

  userClaveSolUpdate = async (
    id: string,
    name: string,
    username: string,
    status: boolean,
    password: string,
    ruc: string,
    token: string,
    buy: boolean,
    sale: boolean,
    newquery:boolean,
    rh:boolean
  ) => {
    try {
      const response = await this.request.put(`/update-user-clave-sol`, {
        id,
        name,
        username,
        status,
        password,
        ruc,
        token,
        buy,
        sale,
        newquery,
        rh
      });
      return response.data;
    } catch (error: any) {
      this.errorMessage(error);
    }
  };

  logs = async (page: number) => {
    try {
      const response = await this.request.get(`/list-logs`, {
        params: { pageSize: 10, page },
      });
      return response.data;
    } catch (error: any) {
      this.errorMessage(error);
    }
  };

  logsStatistics = async (
    page: number,
    search: string,
    month?: number,
    year?: number
  ) => {
    try {
      const response = await this.request.post(`/statistics`, {
        page,
        search,
        month,
        year,
      });
      return response.data;
    } catch (error: any) {
      this.errorMessage(error);
    }
  };

  userClaveSolDelete = async (id: string) => {
    try {
      const response = await this.request.put(`/delete-user-clave-sol`, { id });
      return response.data;
    } catch (error: any) {
      this.errorMessage(error);
    }
  };

  userDelete = async (id: string) => {
    try {
      const response = await this.request.put(`/delete-user`, { id });
      return response.data;
    } catch (error: any) {
      this.errorMessage(error);
    }
  };

  generateNewToken = async () => {
    try {
      const response = await this.request.post(`/generate-token`);
      return response.data;
    } catch (error: any) {
      this.errorMessage(error);
    }
  };

  getById = async (id: string) => {
    try {
      const response = await this.request.post(`/get-by-id`, { id });
      return response.data;
    } catch (error: any) {
      this.errorMessage(error);
    }
  };

  verifyRuc = async (userId: string, ruc: string, username:string) => {
    try {
      const response = await this.request.get(`/verify-ruc/${userId}/${ruc}/${username}`);
      return response.data;
    } catch (error: any) {
      this.errorMessage(error);
    }
  };

  consultRuc = async (ruc: string) => {
    try {
      const response = await this.request.get(`/ruc/${ruc}`);
      return response.data;
    } catch (error: any) {
      this.errorMessage(error);
    }
  };

  verifyEmailUserRegister = async (email: string) => {
    try {
      const response = await this.request.post(`/verify-email`, { email });
      return response.data;
    } catch (error: any) {
      this.errorMessage(error);
    }
  };
  
  logsStatisticsUserClaveSol = async (
    page: number,
    search: string,
    userId:string,
    month?: number,
    year?: number,
  ) => {
    try {
      const response = await this.request.post(`/statistics-user-clave-sol`, {
        page,
        search,
        userId,
        month,
        year
      });
      return response.data;
    } catch (error: any) {
      this.errorMessage(error);
    }
  };

  errorMessage(error: any) {
    try {
      if (error.response && error.response.status === 401) {
        this.routes.navigate(['/authentication/side-login']);
        this.error('Token ha expirado, vuelve a iniciar sesión', 'Error');
        TokenService.removeTokens();
        throw new Error(error.response.data?.message || 'Token ha expirado');
      }
    } catch (e) {
      console.error('Error en el manejo del error:', e);
    }
  }
  error(message: string, title: string = 'Error') {
    alert(`${title}: ${message}`);
  }
}
