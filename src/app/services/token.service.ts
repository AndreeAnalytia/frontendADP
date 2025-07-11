import jwtDecode from 'jwt-decode';

type TokenType = 'ACCESS' | 'REFRESH';

export default class TokenService {
  async setTokens(tokens: any) {
    window.localStorage.setItem('accessToken', tokens.accessToken);
    window.localStorage.setItem('refreshToken', tokens.refreshToken);
  }
  async getUser(user:any){
    window.localStorage.setItem('user', user.user);
    return window.localStorage.getItem('user');
  }

  static getToken(type: TokenType) {
    const key = type === 'ACCESS' ? 'accessToken' : 'refreshToken';
    return window.localStorage.getItem(key);
  }

  static removeTokens() {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
    window.localStorage.removeItem('iduser');
  }

  static decodeToken(tokenType: TokenType): any | null {
    const token = TokenService.getToken(tokenType);

    if (token) {
      return jwtDecode(token);
    }

    return null;
  }

  static getExpiredTime(decodedToken: any | null): number | null {
    return decodedToken ? decodedToken.exp : null;
  }

  static isTokenExpired(tokenType: TokenType): boolean {
    const decodedToken = TokenService.decodeToken(tokenType);
    const expiryTime = TokenService.getExpiredTime(decodedToken);

    if (expiryTime) {
      const isExpired = expiryTime * 1000 - new Date().getTime() < 0;

      return isExpired;
    }

    return true;
  }

  static getDataFromToken(): any | null {
    if (!TokenService.isTokenExpired('ACCESS')) {
      const decodedToken = TokenService.decodeToken('ACCESS');

      if (decodedToken) {
        return { ...decodedToken.data, role: decodedToken.role };
      }
    }

    return null;
  }
}
