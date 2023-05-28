import { Novel } from '../types/Novel';
import { Review } from '../types/Review';
import Client from './client';

const NovelAPI = {
  /**
   * 작품 단일 조회 API입니다.
   */
  findOne: (id: number) => {
    return Client.get<Novel>(`/api-dummy/novel/${id}`);
  },

  /**
   * 작품 리뷰 조회 API입니다.
   */
  findReviews: (id: number) => {
    return Client.get<Review[]>(`/api-dummy/novel/reviews`);
  },

  /**
   * 신규 작품 조회 API입니다.
   */
  newNovels: () => {
    return Client.get<Novel[]>('/novel/list/new');
  },

  /**
   * 인기 작품 조회 API입니다.
   */
  hotNovels: () => {
    return Client.get<Novel[]>('/novel/list/popular');
  },
};

export default NovelAPI;
