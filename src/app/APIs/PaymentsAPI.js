import axios from 'axios';
import API from '@APIs/API';

export class PaymentsAPI extends API {
  constructor() {
    super();
    this.API_PATH = 'api/payments/';
    this.axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL + this.API_PATH,
    });
  }

  async createOrder(planID) {
    try {
      const { data } = await this.axiosInstance.post(
        'orders/',
        { plan_id: planID },
        { headers: { ...PaymentsAPI.createAuthenticationHeaders() } },
      );
      return { data };
    } catch (error) {
      return { error: PaymentsAPI.handleError(error) };
    }
  }
}

export default PaymentsAPI;
