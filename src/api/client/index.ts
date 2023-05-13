import axios, { AxiosError, AxiosResponse } from 'axios';
import { dateDeserializingInterceptor, invalidAccessTokenInterceptor } from './interceptors';

/**
 * API 요청을 위한 Axios 클라이언트 인스턴스입니다.
 */
const Client = axios.create({
  baseURL: process.env.REACT_APP_API_BASEURL,
  timeout: 10000,
});

Client.interceptors.response.use(
  function (response: AxiosResponse) {
    return dateDeserializingInterceptor(response);
  },
  function (error: AxiosError) {
    return invalidAccessTokenInterceptor(error);
  },
);

export default Client;
