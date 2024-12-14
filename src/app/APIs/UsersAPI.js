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

  async forgotPassword(email) {
    try {
      const { data } = await this.axiosInstance.post('/forgot-password/', {
        email,
      });
      return { data };
    } catch (error) {
      return { error: UsersAPI.handleError(error) };
    }
  }

  async resetPassword(newPassword) {  
    try {
      const { data } = await this.axiosInstance.post('/reset-password/', {
        newPassword,
      });
      return { data };
    } catch (error) {
      return { error: UsersAPI.handleError(error) };
    }
  }
}
