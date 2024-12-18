export class API {
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
}

export default API;
