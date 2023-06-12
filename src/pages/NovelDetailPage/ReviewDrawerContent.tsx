/** @jsxImportSource @emotion/react */

import { useContext, useEffect, useState } from 'react';
import { AlertAPIContext } from '../../utils/alert';
import { Review } from '../../types/Review';
import NovelAPI from '../../api/NovelAPI';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  TextField,
  css,
} from '@mui/material';
import styled from '@emotion/styled';

export default function ReviewDrawerContent({ novelId }: ReviewDrawerContentProps) {
  const showAlert = useContext(AlertAPIContext);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [sortOption, setSortOption] = useState('popular'); // new | popular
  const [orderOption, setOrderOption] = useState('desc'); // asc | desc

  const checkSortAndOrderOption = (sort: string, order: string) => {
    return sortOption === sort && orderOption === order;
  };

  const setSortAndOrderOption = (sort: string, order: string) => {
    setSortOption(sort);
    setOrderOption(order);
  };

  const [isLoading, setIsLoading] = useState(false); // 리뷰가 로드 중인지
  const PAGE_SIZE = 15; // 한 번에 로드하는 리뷰 개수

  // 리뷰 작성 모달
  const [dialogOpen, setDialogOpen] = useState(false);
  const [inputReview, setInputReview] = useState('');
  const [inputScore, setInputScore] = useState(5);

  const openReviewDialog = () => {
    setInputReview('');
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    NovelAPI.createReview(novelId, inputScore, inputReview)
      .then(() => {
        reload();
        setDialogOpen(false);
      })
      .catch((e) => {
        showAlert(e.response.data.errorMessage);
        setDialogOpen(false);
      });
  };

  /**
   * `PAGE_SIZE`만큼 더 로드합니다.
   */
  const loadMore = (pastReviews: Review[]) => {
    setIsLoading(true);

    const startIdx = pastReviews.length;
    const endIdx = startIdx + PAGE_SIZE - 1;

    NovelAPI.reviews(novelId, startIdx, endIdx, sortOption, orderOption)
      .then(({ data }) => {
        setReviews([...pastReviews, ...data]);
        setIsLoading(false);
      })
      .catch((e) => {
        showAlert(e.response.data.errorMessage);
        setIsLoading(false);
      });
  };

  /**
   * 처음부터 다시 로드합니다.
   */
  const reload = () => {
    loadMore([]);
  };

  useEffect(() => {
    reload();
  }, [sortOption, orderOption]);

  return (
    <div css={style}>
      <div className="reviews-header">
        <Puller />
        <h2>리뷰 ({reviews.length})</h2>
        <div className="flex-row">
          <ul className="reviews-sort-options">
            <li
              className={`${!checkSortAndOrderOption('new', 'desc') && 'unselected'}`}
              onClick={() => setSortAndOrderOption('new', 'desc')}
            >
              최신순
            </li>
            <li
              className={`${!checkSortAndOrderOption('new', 'asc') && 'unselected'}`}
              onClick={() => setSortAndOrderOption('new', 'asc')}
            >
              과거순
            </li>
            <li
              className={`${!checkSortAndOrderOption('popular', 'desc') && 'unselected'}`}
              onClick={() => setSortAndOrderOption('popular', 'desc')}
            >
              추천 많은 순
            </li>
          </ul>
          <Button onClick={openReviewDialog}>리뷰 작성</Button>
        </div>
      </div>
      <div className="reviews-body">
        <ul className="reviews-list">
          {reviews.map((review) => (
            <li className="reviews-list-item" key={review.id}>
              <div className="flex-row">
                <div>
                  <p>
                    평점 <b>{review.novelScore}</b>점
                  </p>
                  <p className="reviews-list-item-comment">{review.review}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <Box paddingY={2} textAlign="center">
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button onClick={() => loadMore(reviews)}>더 보기</Button>
          )}
        </Box>
      </div>
      <Dialog open={dialogOpen} fullWidth onClose={() => setDialogOpen(false)}>
        <DialogTitle>리뷰 작성</DialogTitle>
        <DialogContent>
          <h4>평점 ({inputScore}점)</h4>
          <Rating
            name="simple-controlled"
            value={inputScore}
            onChange={(event, newValue) => {
              if (!newValue) return;
              setInputScore(newValue);
            }}
          />
          <h4>리뷰</h4>
          <TextField
            autoFocus
            type="text"
            value={inputReview}
            onChange={(e) => setInputReview(e.target.value)}
            rows={5}
            multiline
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>취소</Button>
          <Button onClick={handleSubmit}>작성</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

interface ReviewDrawerContentProps {
  novelId: number;
}

const style = css`
  display: flex;
  flex-direction: column;

  height: 90vh;
  background-color: #fff;
  color: #222;

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
    padding: 25px 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  }

  .reviews-list-item-comment {
    margin-top: 0;
    margin-right: 10px;
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
