import { Novel } from '../types/Novel';
import Client from './client';

const UserAPI = {
  /**
   * 북마크 작품 조회 API입니다.
   */
  findBookmarks: () => {
    return Client.get<Novel[]>('/api-dummy/user/bookmark');
  },
};

export default UserAPI;
