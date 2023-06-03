/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { Avatar, Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import useUserInfo from '../../hooks/useUserInfo';
import { ChangeEvent, useContext, useRef, useState } from 'react';
import UserAPI from '../../api/UserAPI';
import { AlertAPIContext } from '../../utils/alert';
import EditIcon from '@mui/icons-material/Edit';
import styled from '@emotion/styled';

export default function MyPage() {
  const userInfo = useUserInfo();

  const [dialogDisplayed, setDialogDisplayed] = useState(false);

  const showAlert = useContext(AlertAPIContext);

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleAuthorRegistration = () => {
    UserAPI.registerAuthor()
      .then(() => {
        // Dialog 닫기
        setDialogDisplayed(false);
      })
      .catch((error) => {
        showAlert(error.response.data.errorMessage);
      });
  };

  /** 프로필 이미지를 변경하는 핸들러 함수입니다. */
  const handleInputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) {
      showAlert('프로필 이미지 변경 중 문제가 발생했습니다. 1');
      return;
    }

    const file = files.item(0);
    if (!file) {
      showAlert('프로필 이미지 변경 중 문제가 발생했습니다. 2');
      return;
    }

    UserAPI.updateProfileImage(file).then(() => {
      window.location.reload();
    });
  };

  /** 프로필 변경 클릭 핸들러입니다. */
  const handleProfileClick = () => {
    inputFileRef.current?.click();
  };

  if (!userInfo) return <></>;

  return (
    <div css={style}>
      <div className="profile">
        <div className="profile-img-container" onClick={handleProfileClick}>
          <Avatar
            className="profile-img"
            src={userInfo.imageUrl}
            alt="profile"
            sx={{ width: 56, height: 56 }}
          />
          <StyledEditIcon />
          <input
            className="profile-img-input"
            type="file"
            name="file"
            accept="image/*"
            onChange={handleInputFileChange}
            ref={inputFileRef}
          />
        </div>
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
                <>등록 완료</>
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

  .profile-img-container {
    position: relative;
    cursor: pointer;

    &:hover {
      filter: brightness(50%);
    }

    .profile-img-input {
      display: none;
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

const StyledEditIcon = styled(EditIcon)`
  position: absolute;
  top: 35px;
  right: 0px;

  padding: 5px;
  background-color: #fff;
  border-radius: 50%;
  font-size: 14px;
`;
