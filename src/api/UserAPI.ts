import { findAccessToken } from '../services/auth-service';
import { Novel } from '../types/Novel';
import { User } from '../types/User';
import Client from './client';

const UserAPI = {
  /**
   * 북마크 작품 조회 API입니다.
   */
  findBookmarks: () => {
    return Client.get<Novel[]>('/api-dummy/user/bookmark');
  },

  /**
   * 내 정보 조회 API입니다.
   */
  findMyInfo: () => {
    return Client.get<User>('/reader/info', {
      headers: {
        Authorization: `Bearer ${findAccessToken()}`,
      },
    });
  },
};

export default UserAPI;
