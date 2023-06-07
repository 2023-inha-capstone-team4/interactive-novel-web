import { Novel } from '../types/Novel';
import Client from './client';

const SearchAPI = {
  /**
   * 작품 검색 API입니다.
   */
  search: (keyword: string, start: number, end: number) => {
    return Client.get<Novel[]>('/novel/list/search', {
      params: { keyword, startIdx: start, endIdx: end },
    });
  },
};

export default SearchAPI;
