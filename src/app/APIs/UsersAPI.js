import axios from 'axios';

export default class UsersAPI {
  constructor() {
    this.API_PATH = 'users/';
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL + this.API_PATH,
    });
  }

  static handleError(error) {
    if (error.response) {
      const { status, statusText, data } = error.response;
      return {
        statusCode: status,
        message: statusText,
        data,
      };
    }

    if (error.request) {
      return {
        statusCode: 0,
        message: 'NETWORK ERROR',
      };
    }

    return {
      message: 'REQUEST IS NOT SETUP CORRECTLY',
    };
  }

  async loginUser(username, password) {
    try {
      const { data } = await this.axiosInstance.post('/login/', {
        username,
        password,
      });
      return { data };
    } catch (error) {
      return { error: UsersAPI.handleError(error) };
    }
  }

  async validateAccessToken(accessToken) {
    try {
      const response = await fetch(
        `${process.env.NEXT_BACKEND_BASE_URL + this.API_PATH}validate_token`,
        { method: 'GET', headers: { Authorization: `Token ${accessToken}` } },
      );
      if (response.status === 401) {
        return false;
      }
      if (response.status === 404) {
        return Promise.reject(
          new Error('TokenError: Token Validation endpoint returned 404'),
        );
      }
      if (response.status === 200) {
        return true;
      }

      return Promise.reject(new Error('TokenError: Unknown error'));
    } catch (error) {
      return Promise.reject(new Error('TokenError: Network error'));
    }
  }
}
