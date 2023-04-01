import axios from 'axios';

/**
 * API 요청을 위한 Axios 클라이언트 인스턴스입니다.
 */
const Client = axios.create({
  baseURL: process.env.REACT_APP_API_BASEURL,
  timeout: 10000,
});

export default Client;
