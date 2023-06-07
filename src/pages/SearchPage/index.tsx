import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchAPI from '../../api/SearchAPI';
import { Novel } from '../../types/Novel';
import Section from '../../components/Section';
import NovelList from '../../components/NovelList';
import { Box, Button, CircularProgress, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { AlertAPIContext } from '../../utils/alert';

/**
 * 검색 페이지 요소입니다.
 */
function SearchPage() {
  const showAlert = useContext(AlertAPIContext);

  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<Novel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const PAGE_SIZE = 15;

  const keyword = searchParams.get('keyword')!;

  const loadMore = () => {
    setIsLoading(true);

    const start = searchResults.length;
    const end = start + PAGE_SIZE - 1;

    SearchAPI.search(keyword, start, end)
      .then(({ data }) => {
        setSearchResults([...searchResults, ...data]);
        setIsLoading(false);
      })
      .catch((e) => {
        showAlert(e.response.data.errorMessage);
        setIsLoading(false);
      });
  };

  useEffect(() => loadMore(), []);

  return (
    <Section title={`검색 결과 (${searchResults.length}건)`}>
      <NovelList novels={searchResults} />
      <Box textAlign="center" padding={1}>
        {isLoading ? <CircularProgress /> : <Button onClick={loadMore}>더 보기</Button>}
      </Box>
    </Section>
  );
}

export default SearchPage;
