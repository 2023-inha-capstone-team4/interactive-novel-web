import { AuthToken } from '../types/Auth';
import Client from './client';

const AuthAPI = {
  /**
   * 회원 가입 API입니다.
   */
  signUp: (signUpRequest: SignUpRequest) => {
    return Client.post<string>('/sign/up/reader', signUpRequest);
  },

  /**
   * 로그인 API입니다.
   *
   * GET 메서드로 바디를 함께 전송하기 위해,
   * Axios가 아닌 XMLHttpRequest로 요청을 전송합니다.
   *
   * 요청이 성공할 경우 토큰 객체를 반환합니다.
   */
  signIn: (signInRequest: SignInRequest) => {
    return new Promise<AuthToken>((resolve, reject) => {
      const request = new XMLHttpRequest();
      const handleResponse = () => {
        const { status, response } = request;

        if (status >= 400 && status <= 500) {
          reject('로그인 에러');
          return;
        }

        try {
          return JSON.parse(response);
        } catch {
          reject('토큰 파싱 에러');
        }
      };

      request.open('GET', `${process.env.REACT_APP_API_BASEURL}sign/in/reader`);
      request.setRequestHeader('Content-Type', 'application/json');
      request.setRequestHeader('Accept', '*/*');
      request.onload = handleResponse;

      request.send(JSON.stringify(signInRequest));
    });
  },
};

/**
 * 회원 가입에 필요한 요청 타입입니다.
 */
interface SignUpRequest {
  email: string;
  password: string;
  username: string;
}

/**
 * 로그인에 필요한 요청 타입입니다.
 */
interface SignInRequest {
  email: string;
  password: string;
}

export default AuthAPI;
