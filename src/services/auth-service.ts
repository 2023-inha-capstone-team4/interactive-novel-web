import AuthAPI from '../api/AuthAPI';
import { AuthToken } from '../types/Auth';

/**
 * 로컬 스토리지에서 액세스 토큰을 찾아 반환합니다.
 * 저장된 토큰이 없는 경우 `null`을 반환합니다.
 */
export function findAccessToken(): string | null {
  const accessToken = localStorage.getItem('access-token');
  return accessToken;
}

/**
 * 로컬 스토리지에서 리프레시 토큰을 찾아 반환합니다.
 * 저장된 토큰이 없는 경우 `null`을 반환합니다.
 */
export function findRefreshToken(): string | null {
  const refreshToken = localStorage.getItem('refresh-token');
  return refreshToken;
}

/**
 * 로컬 스토리지에 액세스 토큰과 리프레시 토큰을 저장합니다.
 */
export function saveTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem('access-token', accessToken);
  localStorage.setItem('refresh-token', refreshToken);
}

/**
 * 주어진 인증 정보로 로그인합니다.
 */
export function signIn(email: string, password: string): Promise<AuthToken> {
  return new Promise((resolve, reject) => {
    AuthAPI.signIn({ email, password })
      .then((resp) => {
        const authToken = resp.data;
        saveTokens(authToken.accessToken, authToken.refreshToken);
        resolve(authToken);
      })
      .catch(reject);
  });
}

/**
 * 액세스 토큰을 갱신합니다.
 * 갱신된 AuthToken을 반환합니다.
 */
export async function refreshTokens(): Promise<AuthToken> {
  return new Promise((resolve, reject) => {
    AuthAPI.refresh()
      .then((resp) => {
        const authToken = resp.data;
        saveTokens(authToken.accessToken, authToken.refreshToken);
        resolve(authToken);
      })
      .catch(reject);
  });
}

/**
 * Google OAuth에서 받은 `code`를 통해
 * 인증 토큰을 가져와 로컬 스토리지에 저장합니다.
 */
export async function signInWithGoogleOAuth(code: string): Promise<AuthToken> {
  return new Promise((resolve, reject) => {
    AuthAPI.signInWithGoogleOAuth(code)
      .then((resp) => {
        const authToken = resp.data;
        saveTokens(authToken.accessToken, authToken.refreshToken);
        resolve(authToken);
      })
      .catch(reject);
  });
}

/**
 * 네이버 OAuth에서 받은 `code`를 통해
 * 인증 토큰을 가져와 로컬 스토리지에 저장합니다.
 */
export async function signInWithNaverOAuth(code: string, state: string): Promise<AuthToken> {
  return new Promise((resolve, reject) => {
    AuthAPI.signInWithNaverOAuth(code, state)
      .then((resp) => {
        const authToken = resp.data;
        console.log(resp.headers);
        saveTokens(authToken.accessToken, authToken.refreshToken);
        resolve(authToken);
      })
      .catch(reject);
  });
}
