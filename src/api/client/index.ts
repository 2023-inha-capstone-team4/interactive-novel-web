import axios, { AxiosError, AxiosResponse } from 'axios';
import dateDeserializationInterceptor from './dateDeserializationInterceptor';
import expiredTokenInterceptor from './expiredTokenInterceptor';

/**
 * API 요청을 위한 Axios 클라이언트 인스턴스입니다.
 */
const Client = axios.create({
  baseURL: process.env.REACT_APP_API_BASEURL,
  timeout: 10000,
});

// 인터셉터 등록
Client.interceptors.response.use(
  (response) => dateDeserializationInterceptor(response),
  (error) => expiredTokenInterceptor(error),
);

export default Client;
