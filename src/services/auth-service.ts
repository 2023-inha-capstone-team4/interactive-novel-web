import AuthAPI from '../api/AuthAPI';
import { AuthToken } from '../types/Auth';

export function findAccessToken(): string | null {
  const accessToken = localStorage.getItem('access-token');
  return accessToken;
}

export function findRefreshToken(): string | null {
  const refreshToken = localStorage.getItem('refresh-token');
  return refreshToken;
}

export async function getRefreshedToken(): Promise<string> {
  const resp = await AuthAPI.refresh();
  const authToken = resp.data;

  localStorage.setItem('access-token', authToken.accessToken);
  localStorage.setItem('refresh-token', authToken.refreshToken);

  return authToken.accessToken;
}
