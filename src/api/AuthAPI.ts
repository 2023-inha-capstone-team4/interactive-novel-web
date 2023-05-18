import { findAccessToken, findRefreshToken } from '../services/auth-service';
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
    return Client.post<AuthToken>('/sign/in/reader', signInRequest);
  },

  /**
   * 액세스 토큰 갱신 API입니다.
   */
  refresh: () => {
    const accessToken = findAccessToken();
    const refreshToken = findRefreshToken();

    return Client.post<AuthToken>(
      '/refresh',
      { refreshToken },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  },

  /**
   * Google OAuth 인증 API입니다.
   */
  signInWithGoogleOAuth: (code: string) => {
    return Client.get<AuthToken>(`/sign/in/oauth2/google?code=${code}`);
  },

  /**
   * 네이버 OAuth 인증 API입니다.
   */
  signInWithNaverOAuth: (code: string, state: string) => {
    return Client.get<AuthToken>(`/sign/in/oauth2/naver?code=${code}&state=${state}`);
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
