import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Novel } from '../../types/Novel';
import NovelAPI from '../../api/NovelAPI';
import Section from '../../components/Section';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import styled from '@emotion/styled';
import { dateToString } from '../../utils/date';
import PlayButton from './PlayButton';
import BookmarkToggleButton from './BookmarkToggleButton';

function NovelDetailPage() {
  const { id } = useParams();
  const [novel, setNovel] = useState<Novel>();
  const [bookmarked, setBookmarked] = useState(false);

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  useEffect(() => {
    if (!id) return;
    const idInt = parseInt(id);
    if (isNaN(idInt)) return;

    NovelAPI.findOne(idInt).then((resp) => {
      setNovel(resp.data);
    });
  }, []);

  // 로딩 뷰
  if (!novel) {
    return (
      <Box height="300px" display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Section title={novel.name}>
        <Box sx={{ position: 'absolute', top: 0, right: 15 }}>
          <BookmarkToggleButton value={bookmarked} onClick={toggleBookmark} />
        </Box>
        <Stack direction="row" spacing={1} marginX="15px">
          <Author to={`/publisher/${novel.publisher.id}`}>{novel.publisher.name}</Author>
          <PublishedDate>{dateToString(novel.publishedDate)}</PublishedDate>
          <RateScore>
            평점 <b>{4.5}</b>
          </RateScore>
        </Stack>
        <Box padding="15px">
          <Description>
            {'Based on the story by Nam Le, Adaptation by Matt Huynh, Produced by SBS.'}
          </Description>
        </Box>
        <PlayButton
          novelId={novel.id}
          thumbnail="http://www.sbs.com.au/theboat/images/fb-image.jpg"
        />
      </Section>
    </>
  );
}

const Author = styled(Link)`
  margin: 0;
  font-size: 14px;
  font-weight: bold;
`;

const PublishedDate = styled.p`
  margin: 0;
  font-size: 12px;
`;

const RateScore = styled.p`
  margin: 0;
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 12px;
  color: #797979;
`;

export default NovelDetailPage;
