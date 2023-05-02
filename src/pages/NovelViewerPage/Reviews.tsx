/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { useState } from 'react';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [sortOption, setSortOption] = useState('likes');

  return (
    <div css={style}>
      <Puller />
      <h2 className="reviews-header">리뷰 ({reviews.length})</h2>
      <div className="reviews-row">
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
      <ul>
        {reviews.map((review) => (
          <li></li>
        ))}
      </ul>
    </div>
  );
}

const style = css`
  height: 85vh;
  padding: 30px 15px;
  background-color: #121212;
  color: #fff;

  .reviews-row {
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
