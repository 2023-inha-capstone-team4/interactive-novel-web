/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { Avatar, Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import useUserInfo from '../../hooks/useUserInfo';
import { useState } from 'react';
import UserAPI from '../../api/UserAPI';

export default function MyPage() {
  const userInfo = useUserInfo();

  const [dialogDisplayed, setDialogDisplayed] = useState(false);

  const handleAuthorRegistration = () => {
    UserAPI.registerAuthor().then(() => {
      // Dialog 닫기
      setDialogDisplayed(false);
    });
  };

  if (!userInfo) return <></>;

  return (
    <div css={style}>
      <div className="profile">
        <Avatar src={userInfo.imageUrl} alt="profile" sx={{ width: 56, height: 56 }} />
        <h2>{userInfo.username}</h2>
      </div>
      <div className="info">
        <h3>기본 정보</h3>
        <table className="info-table">
          <tr>
            <th>이메일</th>
            <td>{userInfo.email}</td>
          </tr>
          <tr>
            <th>멤버십 구독</th>
            <td>{userInfo.isPaid}</td>
          </tr>
          <tr>
            <th>작가 등록</th>
            <td>
              {userInfo.author ? (
                <>
                  등록 안됨 <Button onClick={() => setDialogDisplayed(true)}>등록하기</Button>
                </>
              ) : (
                <>
                  등록 안됨 <Button onClick={() => setDialogDisplayed(true)}>등록하기</Button>
                </>
              )}
            </td>
          </tr>
        </table>
      </div>
      <Dialog open={dialogDisplayed} onClose={() => setDialogDisplayed(false)}>
        <DialogContent>
          작가 등록시 작품 제작을 위한 전용 에디터를 이용할 수 있으며, 만든 작품을 업로드하여 공유할
          수 있습니다.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAuthorRegistration}>작가 등록하기</Button>
          <Button onClick={() => setDialogDisplayed(false)}>취소</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const style = css`
  .profile {
    background-color: rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    padding: 80px 15px 40px 15px;

    h2 {
      margin: 0;
      margin-top: 15px;
    }
  }

  .info {
    padding: 0 15px;
  }

  .info-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 1em;

    font-size: 14px;

    tr {
      height: 36px;
      margin-bottom: 10px;
    }

    th {
      padding-right: 5px;
      background-color: rgba(0, 0, 0, 0.05);
      border-radius: 3px;
      text-align: center;
    }

    td {
      padding-left: 15px;
      text-align: left;
    }
  }
`;
