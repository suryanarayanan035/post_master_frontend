import axios from 'axios';
import { API } from '@APIs/API';

export default class UsersAPI extends API {
  constructor() {
    super();
    this.API_PATH = 'users/';
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL + this.API_PATH,
    });
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
