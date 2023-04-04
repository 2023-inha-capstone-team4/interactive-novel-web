import { useSearchParams } from 'react-router-dom';

/**
 * 검색 페이지 요소입니다.
 */
function SearchPage() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  return <>{keyword}</>;
}

export default SearchPage;
