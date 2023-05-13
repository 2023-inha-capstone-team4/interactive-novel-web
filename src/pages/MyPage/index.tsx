/** @jsxImportSource @emotion/react */

import { useEffect, useState } from 'react';
import { User } from '../../types/User';
import UserAPI from '../../api/UserAPI';
import { css } from '@emotion/react';
import { Avatar } from '@mui/material';

export default function MyPage() {
  const [info, setInfo] = useState<User>();

  useEffect(() => {
    UserAPI.findMyInfo().then((resp) => setInfo(resp.data));
  }, []);

  if (!info) return <></>;

  return (
    <div css={style}>
      <div className="profile">
        <Avatar src={info.imageUrl} alt="profile" sx={{ width: 56, height: 56 }} />
        <h2>{info.username}</h2>
      </div>
      <div className="info">
        <h3>기본 정보</h3>
        <table className="info-table">
          <tr>
            <th>이메일</th>
            <td>{info.email}</td>
          </tr>
          <tr>
            <th>멤버십 구독</th>
            <td>{info.isPaid}</td>
          </tr>
          <tr>
            <th>작가 등록</th>
            <td>{info.author ? '등록 완료' : '등록 안됨'}</td>
          </tr>
        </table>
      </div>
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
