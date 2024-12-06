import Cookies from 'js-cookie';

export function setCookie(name, value) {
  Cookies.set(name, value);
}

export function extractErrorMessage(error) {
  const { statusCode, data } = error;
  let { message } = error;
  if (statusCode !== undefined && statusCode !== null) {
    if (statusCode !== 0) {
      if (statusCode === 400) {
        message = '';
        /* eslint-disable-next-line no-restricted-syntax,guard-for-in */
        for (const key in data) {
          const value = data[key];
          message += `${key}: `;
          message = Array.isArray(value) ? value.join(' ') : `${value} \n `;
        }
      }
    }
  }
  return message;
}
