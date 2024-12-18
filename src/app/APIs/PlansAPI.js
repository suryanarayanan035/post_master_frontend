import axios from 'axios';
import { API } from '@APIs/API';

export class PlansAPI extends API {
  constructor() {
    super();
    this.API_PATH = 'api/common/plans';
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL + this.API_PATH,
    });
  }

  async getPlans() {
    try {
      const { data } = await this.axiosInstance.get('');
      return {
        data,
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return { error: PlansAPI.handleError(error) };
    }
  }
}

export default PlansAPI;
