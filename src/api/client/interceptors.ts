import { AxiosResponse } from 'axios';

interface Interceptor {
  (response: AxiosResponse): AxiosResponse;
}

/**
 * 날짜를 표현하는 문자열을 Date로 변환합니다.
 */
const dateDeserializingInterceptor: Interceptor = (response) => {
  const isoFormatRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;
  const handleDate = (obj: any) => {
    if (typeof obj !== 'object' || !obj) return;

    for (const key of Object.keys(obj)) {
      const value = obj[key];

      if (typeof value === 'string' && isoFormatRegex.test(value)) {
        obj[key] = new Date(value);
      } else if (typeof value === 'object') {
        handleDate(value);
      }
    }
  };

  handleDate(response.data);
  return response;
};

export { dateDeserializingInterceptor };
