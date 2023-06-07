import { findAccessToken } from '../services/auth-service';
import { BookmarkedNovel, Novel } from '../types/Novel';
import { User } from '../types/User';
import Client from './client';

const UserAPI = {
  /**
   * 북마크 작품 조회 API입니다.
   */
  bookmarkedNovels: () => {
    return Client.get<BookmarkedNovel[]>('/bookmark/novel', {
      headers: {
        Authorization: `Bearer ${findAccessToken()}`,
      },
    });
  },

  /**
   * 특정 작품의 북마크 여부를 조회합니다.
   */
  isNovelBookmarked: (novelId: number) => {
    return Client.get<boolean>(`/bookmark/novel/${novelId}`, {
      headers: {
        Authorization: `Bearer ${findAccessToken()}`,
      },
    });
  },

  /**
   * 작품을 북마크합니다.
   */
  toggleNovelBookmark: (novelId: number) => {
    return Client.post(
      `/bookmark/novel/${novelId}/set`,
      {},
      {
        headers: {
          Authorization: `Bearer ${findAccessToken()}`,
        },
      },
    );
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

  /**
   * 작가 등록 API입니다.
   */
  registerAuthor: () => {
    return Client.post<string>('/reader/getAuthor', null, {
      headers: {
        Authorization: `Bearer ${findAccessToken()}`,
      },
    });
  },

  /**
   * 프로필 이미지 변경 API입니다.
   */
  updateProfileImage: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    return Client.post('/reader/modifyProfileImg', formData, {
      headers: {
        Authorization: `Bearer ${findAccessToken()}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default UserAPI;
