import { Novel } from '../types/Novel';
import Client from './client';

const NovelAPI = {
  /**
   * 작품 단일 조회 API입니다.
   */
  findOne: (id: number) => {
    return Client.get<Novel>(`/api-dummy/novel/${id}`);
  },
};

export default NovelAPI;
