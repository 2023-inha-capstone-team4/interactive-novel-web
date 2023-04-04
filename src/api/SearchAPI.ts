import { Novel } from '../types/Novel';
import Client from './client';

const SearchAPI = {
  /**
   * 작품 검색 API입니다.
   */
  search: (keyword: string, sort: string) => {
    return Client.get<Novel[]>('/api-dummy/search', { params: { keyword, sort } });
  },
};

export default SearchAPI;
