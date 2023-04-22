import { Novel } from '../types/Novel';
import { Publisher } from '../types/Publisher';
import Client from './client';

const PublisherAPI = {
  /**
   * 작가 정보 조회 API입니다.
   */
  findOne: (id: number) => {
    return Client.get<Publisher>(`/api-dummy/publisher/${id}/info`);
  },

  /**
   * 작가 작품 조회 API입니다.
   */
  findNovels: (id: number) => {
    return Client.get<Novel[]>(`/api-dummy/publisher/${id}/novel`);
  },
};

export default PublisherAPI;
