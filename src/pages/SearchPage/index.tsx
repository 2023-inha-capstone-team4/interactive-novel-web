import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchAPI from '../../api/SearchAPI';
import { Novel } from '../../types/Novel';
import Section from '../../components/Section';
import NovelList from '../../components/NovelList';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

/**
 * 검색 페이지 요소입니다.
 */
function SearchPage() {
  const [searchParams] = useSearchParams();
  const [sortOption, setSortOption] = useState('likes-desc');
  const [searchResults, setSearchResults] = useState<Novel[]>([]);

  const handleSortOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortOption(event.target.value);
  };

  useEffect(() => {
    const keyword = searchParams.get('keyword');
    if (keyword) {
      SearchAPI.search(keyword, sortOption).then((resp) => {
        setSearchResults(resp.data);
      });
    }
  }, [sortOption]);

  return (
    <Section title={`검색 결과 (${searchResults.length}건)`}>
      <RadioGroup
        row
        value={sortOption}
        onChange={handleSortOptionChange}
        sx={{ paddingLeft: '15px' }}
      >
        <FormControlLabel value="likes-desc" control={<Radio />} label="좋아요 많은 순" />
        <FormControlLabel value="date-desc" control={<Radio />} label="최신순" />
        <FormControlLabel value="views-desc" control={<Radio />} label="조회순" />
      </RadioGroup>
      <NovelList novels={searchResults} />
    </Section>
  );
}

export default SearchPage;
