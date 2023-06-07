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
};

export default NovelAPI;
