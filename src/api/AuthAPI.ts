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
   */
  signIn: (signInRequest: SignInRequest) => {
    return Client.post<string>('/sign/in/reader', signInRequest);
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
