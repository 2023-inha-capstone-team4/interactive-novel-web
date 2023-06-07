/** @jsxImportSource @emotion/react */

import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
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
import UserAPI from '../../api/UserAPI';
import { AlertAPIContext } from '../../utils/alert';

const TheBoatThumbnail = require('../../assets/img/the-boat.gif');

function NovelDetailPage() {
  const showAlert = useContext(AlertAPIContext);

  const { id: idParam } = useParams();
  const id = parseInt(idParam!);

  const { state: novel } = useLocation();

  const [bookmarked, setBookmarked] = useState(false);

  const toggleBookmark = () => {
    UserAPI.toggleNovelBookmark(id)
      .then(() => {
        setBookmarked(!bookmarked);
      })
      .catch((e) => {
        showAlert(e.response.data.errorMessage);
      });
  };

  useEffect(() => {
    UserAPI.isNovelBookmarked(id).then(({ data }) => {
      setBookmarked(data);
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
        <img src={novel.novelImageUrl} alt="thumbnail" />
      </div>
      <Section title={novel.novelName}>
        <Box sx={{ position: 'absolute', top: 0, right: 15 }}>
          <BookmarkToggleButton value={bookmarked} onClick={toggleBookmark} />
        </Box>
        <Stack direction="row" marginX="15px">
          <Link className="author" to={`/publisher/${novel.authorId}`}>
            {novel.authorName}
          </Link>
          {/* <p className="rate-score">
            평점 <b>{novel.totalScore}</b>
          </p> */}
        </Stack>
        <Box paddingX="15px">
          <p className="description">{novel.novelIntroduce}</p>
        </Box>
        <Box paddingX="15px" paddingY="10px">
          <h3>에피소드</h3>
          <EpisodeList novelId={id} />
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

  .rate-score {
    margin: 0;
    font-size: 12px;
  }

  .description {
    font-size: 12px;
    color: #797979;
  }
`;

export default NovelDetailPage;
