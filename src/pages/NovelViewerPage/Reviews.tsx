/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Comment } from '../../types/Novel';
import Client from '../../api/client';
import NovelAPI from '../../api/NovelAPI';
import { AlertAPIContext } from '../../utils/alert';

export default function Reviews(props: ReviewsProps) {
  const showAlert = useContext(AlertAPIContext);
  const [comments, setComments] = useState<Comment[]>([]);
  const [sortOption, setSortOption] = useState('popular'); // new | popular

  const [isLoading, setIsLoading] = useState(false); // 댓글이 로드 중인지
  const PAGE_SIZE = 15; // 한 번에 로드하는 댓글 개수

  // 댓글 작성 모달
  const [dialogOpen, setDialogOpen] = useState(false);
  const [inputComment, setInputComment] = useState('');

  const openCommentDialog = () => {
    setInputComment('');
    setDialogOpen(true);
  };

  const handleSubmitComment = () => {
    NovelAPI.createComment(props.episodeId, inputComment)
      .then(() => {
        reloadComments(); // 댓글 새로고침
        setDialogOpen(false);
      })
      .catch((e) => {
        showAlert(e.response.data.errorMessage);
        setDialogOpen(false);
      });
  };

  /**
   * 댓글을 `PAGE_SIZE`만큼 더 로드합니다.
   */
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

  /**
   * 댓글을 처음부터 다시 로드합니다.
   */
  const reloadComments = () => {
    setComments([]);
    loadMoreComments();
  };

  /**
   * 정렬 기준을 변경하고, 댓글을 다시 로드합니다.
   */
  const changeSortOption = (option: string) => {
    setSortOption(option);
    reloadComments(); // 댓글 새로고침
  };

  /**
   * 댓글을 추천합니다.
   */
  const upvoteComment = (commentId: number) => {
    NovelAPI.upvoteComment(commentId)
      .then(() => {
        // 댓글 카운트 증가
        // 새로고침 없이 상태 값 수정
        const updatedComments = [...comments].map((comment) => {
          if (comment.id === commentId) {
            comment.recommendAmount++;
            return comment;
          }

          return comment;
        });

        setComments(updatedComments);
      })
      .catch((e) => showAlert(e.response.data.errorMessage));
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
              onClick={() => changeSortOption('popular')}
            >
              추천순
            </li>
            <li
              className={`${sortOption !== 'new' && 'unselected'}`}
              onClick={() => changeSortOption('new')}
            >
              최신순
            </li>
          </ul>
          <Button onClick={openCommentDialog} sx={{ color: 'white' }}>
            댓글 작성
          </Button>
        </div>
      </div>
      <div className="reviews-body">
        <ul className="reviews-list">
          {comments.map((comment) => (
            <li className="reviews-list-item" key={comment.id}>
              <div className="flex-row">
                <div>
                  <p className="reviews-list-item-comment">{comment.comment}</p>
                </div>
                <Button size="small" variant="outlined" onClick={() => upvoteComment(comment.id)}>
                  {comment.recommendAmount} 추천
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <Box paddingY={2} textAlign="center">
          {isLoading ? <CircularProgress /> : <Button onClick={loadMoreComments}>더 보기</Button>}
        </Box>
      </div>
      <Dialog open={dialogOpen} fullWidth onClose={() => setDialogOpen(false)}>
        <DialogTitle>댓글 작성</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            type="text"
            value={inputComment}
            onChange={(e) => setInputComment(e.target.value)}
            rows={5}
            multiline
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>취소</Button>
          <Button onClick={handleSubmitComment}>작성</Button>
        </DialogActions>
      </Dialog>
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
