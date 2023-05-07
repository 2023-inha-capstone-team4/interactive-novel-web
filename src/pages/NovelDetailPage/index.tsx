/** @jsxImportSource @emotion/react */

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
import EpisodeList from './EpisodeList';
import { css } from '@emotion/react';

const TheBoatThumbnail = require('../../assets/img/the-boat.gif');

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
    <div css={style}>
      <div className="thumbnail">
        <img src={TheBoatThumbnail} alt="thumbnail" />
      </div>
      <Section title={novel.name}>
        <Box sx={{ position: 'absolute', top: 0, right: 15 }}>
          <BookmarkToggleButton value={bookmarked} onClick={toggleBookmark} />
        </Box>
        <Stack direction="row" marginX="15px">
          <Link className="author" to={`/publisher/${novel.publisher.id}`}>
            {novel.publisher.name}
          </Link>
          <p className="published-date">{dateToString(novel.publishedDate)}</p>
          <p className="rate-score">
            평점 <b>{4.5}</b>
          </p>
        </Stack>
        <Box paddingX="15px">
          <p className="description">
            {'Based on the story by Nam Le, Adaptation by Matt Huynh, Produced by SBS.'}
          </p>
        </Box>
        <Box paddingX="15px" paddingY="10px">
          <h3>에피소드 (4)</h3>
          <EpisodeList />
        </Box>
      </Section>
    </div>
  );
}

const style = css`
  .thumbnail {
    width: 100%;
    height: 400px;

    img {
      width: inherit;
      height: inherit;
      object-fit: cover;
    }
  }

  .author {
    margin: 0;
    font-size: 14px;
    font-weight: bold;
  }

  .published-date {
    margin: 0;
    margin-left: 10px;
    font-size: 12px;
  }

  .rate-score {
    margin: 0;
    margin-left: 10px;
    font-size: 12px;
  }

  .description {
    font-size: 12px;
    color: #797979;
  }
`;

export default NovelDetailPage;
