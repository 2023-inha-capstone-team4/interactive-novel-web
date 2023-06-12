import { findAccessToken } from '../services/auth-service';
import { Comment, Episode, Novel } from '../types/Novel';
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
   * 신규 작품 조회 API입니다.
   */
  newNovels: () => {
    return Client.get<Novel[]>('/novel/list/new');
  },

  /**
   * 인기 작품 조회 API입니다.
   */
  hotNovels: (start: number, end: number) => {
    return Client.get<Novel[]>(`/novel/list/popular?startIdx=${start}&endIdx=${end}`);
  },

  /**
   * 댓글 조회 API입니다.
   */
  comments: (episodeId: number, start: number, end: number, method: string) => {
    return Client.get<Comment[]>(
      `/novel/comment/list/${episodeId}?startIdx=${start}&endIdx=${end}&method=${method}`,
    );
  },

  /**
   * 댓글 작성 API입니다.
   */
  createComment: (episodeId: number, comment: string) => {
    return Client.post<Comment>(`/novel/comment/${episodeId}`, comment, {
      headers: {
        Authorization: `Bearer ${findAccessToken()}`,
        'Content-Type': 'text/plain',
      },
    });
  },

  /**
   * 댓글 수정 API입니다.
   */
  updateComment: (episodeId: number, comment: string) => {
    return Client.patch<Comment>(`/novel/comment/${episodeId}/modify`, comment, {
      headers: {
        Authorization: `Bearer ${findAccessToken()}`,
      },
    });
  },

  /**
   * 댓글 추천 API입니다.
   */
  upvoteComment: (commendId: number) => {
    return Client.post<void>(
      `/novel/comment/recommend/${commendId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${findAccessToken()}`,
        },
      },
    );
  },

  /**
   * 작품의 에피소드 목록을 조회하는 API입니다.
   */
  episodes: (novelId: number, start: number, end: number, order: string = 'desc') => {
    return Client.get<Episode[]>(
      `/novel/list/detail/${novelId}?startIdx=${start}&endIdx=${end}&order=${order}`,
    );
  },

  /**
   * 회차 데이터를 조회하는 API입니다.
   */
  episode: (episodeId: number) => {
    return Client.get<Episode>(`/novel/view/${episodeId}`, {
      headers: {
        Authorization: `Bearer ${findAccessToken()}`,
      },
    });
  },

  /**
   * 주어진 카테고리의 노벨 리스트를 조회하는 API입니다.
   */
  novelsByCategory: (categoryKey: string, start: number, end: number) => {
    const key = categoryKey.toLowerCase();

    return Client.get<Novel[]>(
      `/novel/list/category?category=${key}&startIdx=${start}&endIdx=${end}`,
    );
  },

  /**
   * 리뷰 조회 API입니다.
   *
   * @param method new | popular
   * @param order asc | desc
   */
  reviews: (novelId: number, start: number, end: number, method: string, order: string) => {
    return Client.get<Review[]>(`/novel/review/list/${novelId}`, {
      params: {
        startIdx: start,
        endIdx: end,
        method,
        order,
      },
      headers: {
        Authorization: `Bearer ${findAccessToken()}`,
      },
    });
  },

  /**
   * 리뷰 작성 API입니다.
   */
  createReview: (novelId: number, novelScore: number, review: string) => {
    return Client.post(
      `/novel/review/${novelId}`,
      { novelScore, review },
      {
        headers: {
          Authorization: `Bearer ${findAccessToken()}`,
        },
      },
    );
  },
};

export default NovelAPI;
