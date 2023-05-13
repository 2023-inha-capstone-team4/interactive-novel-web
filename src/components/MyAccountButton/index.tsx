import { Avatar, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import { findAccessToken } from '../../services/auth-service';
import { useEffect, useState } from 'react';
import { User } from '../../types/User';
import UserAPI from '../../api/UserAPI';

export default function MyAccountButton() {
  const navigate = useNavigate();

  // 상태: 내 정보
  const [info, setInfo] = useState<User>();

  /**
   * 버튼 클릭에 대한 핸들러입니다.
   *
   * 조회된 내 정보가 존재하는 경우에는 로그인이 된 것으로 간주하여 마이 페이지로,
   * 그렇지 않은 경우에는 로그인 화면으로 이동시킵니다.
   */
  const handleAccountButtonClick = () => {
    if (!info) {
      navigate('/sign/in');
      return;
    }

    navigate('/my');
  };

  // 내 계정 정보를 불러옵니다.
  useEffect(() => {
    UserAPI.findMyInfo().then((resp) => setInfo(resp.data));
  });

  return (
    <IconButton onClick={handleAccountButtonClick}>
      {info ? (
        <Avatar src={info.imageUrl} alt="profile" sx={{ width: 24, height: 24 }} />
      ) : (
        <LoginIcon />
      )}
    </IconButton>
  );
}
