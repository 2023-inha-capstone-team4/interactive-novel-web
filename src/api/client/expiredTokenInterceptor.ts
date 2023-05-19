import { AxiosError } from 'axios';
import { APIError } from '../../types/Error';
import { refreshTokens } from '../../services/auth-service';
import Client from '.';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AlertAPIContext } from '../../utils/alert';

/**
 * 액세스 토큰이 만료되어 발생한 에러에 대해
 * 토큰을 갱신합니다.
 */
const expiredTokenInterceptor = (error: AxiosError<any>) => {
  if (!error.response) {
    return Promise.reject(error);
  }

  const apiError: APIError = error.response.data;
  const config = error.config!;

  // 토큰이 만료된 경우
  if (apiError.errorCode === 'INVALID_ACCESS_TOKEN') {
    // 갱신이 아직 진행되고 있지 않다면 갱신 시작
    if (!RefreshQueue.refreshing) {
      RefreshQueue.refreshing = true;
      refreshTokens()
        .then(({ accessToken }) => {
          RefreshQueue.refreshing = false;
          RefreshQueue.onRefreshed(accessToken);
        })
        .catch(() => {
          // 다시 로그인 필요
          const navigate = useNavigate();
          navigate('/sign/in');
        });
    }

    const retryingRequest = new Promise((resolve, reject) => {
      RefreshQueue.enqueue((token) => {
        config.headers.Authorization = `Bearer ${token}`;
        resolve(Client.request(config));
      });
    });

    return retryingRequest;
  }

  return Promise.reject(error);
};

/**
 * 여러 병렬 HTTP 요청에 의해
 * 동시에 두 개 이상의 토큰 갱신이 일어나지 않도록 제어하기 위한 자료구조입니다.
 */
const RefreshQueue = {
  refreshing: false,
  queue: [] as RefreshCallback[],

  enqueue(cb: RefreshCallback) {
    this.queue.push(cb);
  },

  onRefreshed(token: string) {
    while (this.queue.length > 0) {
      const cb = this.queue.shift()!;
      cb(token);
    }
  },
};

/**
 * RefreshQueue에 들어가는 콜백 함수 인터페이스
 */
interface RefreshCallback {
  (token: string): void;
}

export default expiredTokenInterceptor;
