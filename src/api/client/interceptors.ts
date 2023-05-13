import axios, { AxiosError, AxiosResponse } from 'axios';
import { APIError } from '../../types/Error';
import AuthAPI from '../AuthAPI';
import { refreshTokens } from '../../services/auth-service';
import Client from '.';
import { useNavigate } from 'react-router-dom';

/**
 * 날짜를 표현하는 문자열을 Date로 변환합니다.
 */
export const dateDeserializingInterceptor = (response: AxiosResponse) => {
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

/**
 * 액세스 토큰이 만료되어 발생한 에러에 대해
 * 토큰을 갱신합니다.
 */
export const invalidAccessTokenInterceptor = (error: AxiosError<any>) => {
  const apiError: APIError = error.response!.data;

  // Refresh!
  // https://github.com/axios/axios/issues/934#issuecomment-322003342
  if (apiError.errorCode === 'INVALID_ACCESS_TOKEN') {
    return refreshTokens()
      .then(({ accessToken }) => {
        const config = error.config!;
        config.headers.Authorization = `Bearer ${accessToken}`;
        return Client.request(config);
      })
      .catch(() => {
        // 다시 로그인 필요
        const navigate = useNavigate();
        navigate('/sign/in');
      });
  }

  return Promise.reject(error);
};
