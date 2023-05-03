/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import NovelAPI from '../../api/NovelAPI';
import { Review } from '../../types/Review';
import { dateToString } from '../../utils/date';

export default function Reviews(props: ReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [sortOption, setSortOption] = useState('likes');

  useEffect(() => {
    NovelAPI.findReviews(props.novelId).then((resp) => setReviews(resp.data));
  }, []);

  return (
    <div css={style}>
      <div className="reviews-header">
        <Puller />
        <h2>리뷰 ({reviews.length})</h2>
        <div className="flex-row">
          <ul className="reviews-sort-options">
            <li
              className={`${sortOption !== 'likes' && 'unselected'}`}
              onClick={() => setSortOption('likes')}
            >
              추천순
            </li>
            <li
              className={`${sortOption !== 'recent' && 'unselected'}`}
              onClick={() => setSortOption('recent')}
            >
              최신순
            </li>
          </ul>
          <div className="reviews-write-button">리뷰 작성</div>
        </div>
      </div>
      <div className="reviews-body">
        <ul className="reviews-list">
          {reviews.map((review) => (
            <li className="reviews-list-item">
              <div className="flex-row">
                <div>
                  <p>
                    <b>{review.readerName}</b>
                  </p>
                  <p>{dateToString(review.created)}</p>
                </div>
                <Button size="small" variant="outlined">
                  {review.likes} 추천
                </Button>
              </div>
              <p className="reviews-list-item-comment">{review.comment}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface ReviewsProps {
  novelId: number;
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
