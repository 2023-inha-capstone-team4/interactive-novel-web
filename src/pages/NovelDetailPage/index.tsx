import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Novel } from '../../types/Novel';
import NovelAPI from '../../api/NovelAPI';
import Section from '../../components/Section';
import { Box, CircularProgress, Stack } from '@mui/material';
import styled from '@emotion/styled';
import { dateToString } from '../../utils/date';
import PlayButton from './PlayButton';

function NovelDetailPage() {
  const { id } = useParams();
  const [novel, setNovel] = useState<Novel>();

  useEffect(() => {
    if (!id) return;
    const idInt = parseInt(id);
    if (isNaN(idInt)) return;

    NovelAPI.findOne(idInt).then((resp) => {
      setNovel(resp.data);
    });
  }, []);

  if (!novel) {
    return <CircularProgress />;
  }

  return (
    <>
      <Section title={novel.name}>
        <Stack direction="row" spacing={1} marginX="15px">
          <Author>{novel.publisher.name}</Author>
          <PublishedDate>{dateToString(novel.publishedDate)}</PublishedDate>
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

const Author = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: bold;
`;

const PublishedDate = styled.p`
  margin: 0;
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 12px;
  color: #797979;
`;

export default NovelDetailPage;
