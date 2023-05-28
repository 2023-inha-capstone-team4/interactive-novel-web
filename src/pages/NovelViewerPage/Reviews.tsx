/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Box, Button, CircularProgress } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Comment } from '../../types/Novel';
import Client from '../../api/client';
import NovelAPI from '../../api/NovelAPI';
import { AlertAPIContext } from '../../utils/alert';

export default function Reviews(props: ReviewsProps) {
  const showAlert = useContext(AlertAPIContext);
  const [comments, setComments] = useState<Comment[]>([]);
  const [sortOption, setSortOption] = useState('popular'); // new | popular

  const [isLoading, setIsLoading] = useState(false);
  const PAGE_SIZE = 15;

  const loadMoreComments = () => {
    setIsLoading(true);

    const startIdx = comments.length;
    const endIdx = startIdx + PAGE_SIZE - 1;

    NovelAPI.comments(props.episodeId, startIdx, endIdx, sortOption)
      .then(({ data }) => {
        setComments([...comments, ...data]);
        setIsLoading(false);
      })
      .catch((e) => {
        showAlert(e.response.data.errorMessage);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadMoreComments();
  }, []);

  return (
    <div css={style}>
      <div className="reviews-header">
        <Puller />
        <h2>댓글 ({comments.length})</h2>
        <div className="flex-row">
          <ul className="reviews-sort-options">
            <li
              className={`${sortOption !== 'popular' && 'unselected'}`}
              onClick={() => setSortOption('popular')}
            >
              추천순
            </li>
            <li
              className={`${sortOption !== 'new' && 'unselected'}`}
              onClick={() => setSortOption('new')}
            >
              최신순
            </li>
          </ul>
          <div className="reviews-write-button">리뷰 작성</div>
        </div>
      </div>
      <div className="reviews-body">
        <ul className="reviews-list">
          {comments.map((comment) => (
            <li className="reviews-list-item" key={comment.id}>
              <div className="flex-row">
                <div>
                  <p>
                    <b>{comment.readerName}</b>
                  </p>
                </div>
                <Button size="small" variant="outlined">
                  {comment.recommendAmount} 추천
                </Button>
              </div>
              <p className="reviews-list-item-comment">{comment.comment}</p>
            </li>
          ))}
        </ul>
        <Box paddingY={2} textAlign="center">
          {isLoading ? <CircularProgress /> : <Button onClick={loadMoreComments}>더 보기</Button>}
        </Box>
      </div>
    </div>
  );
}

interface ReviewsProps {
  episodeId: number;
}

const style = css`
  display: flex;
  flex-direction: column;

  height: 90vh;
  background-color: #121212;
  color: #fff;

  .reviews-header {
    padding: 20px 15px 10px 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    flex-shrink: 0;

    & > h2 {
      margin-bottom: 5px;
    }
  }

  .reviews-body {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    padding-bottom: 80px;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .reviews-sort-options {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    list-style: none;
    padding-left: 0;

    & > li {
      margin-right: 10px;
      cursor: pointer;
    }
  }

  .unselected {
    color: #808080;
  }

  .reviews-write-button {
    cursor: pointer;
  }

  .reviews-list {
    margin: 0;
    font-size: 12px;
  }

  .reviews-list-item {
    padding: 3px 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  }

  .reviews-list-item-comment {
    margin-top: 0;
  }
`;

const Puller = styled.div`
  width: 30px;
  height: 6px;
  background-color: #808080;
  border-radius: 3px;
  position: absolute;
  top: 8px;
  left: calc(50% - 15px);
`;
