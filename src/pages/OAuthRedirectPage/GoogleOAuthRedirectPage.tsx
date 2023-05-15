import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { signInWithGoogleOAuth } from '../../services/auth-service';
import { CircularProgress } from '@mui/material';

export default function GoogleOAuthRedirectPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code');
  const error = searchParams.get('error');

  // 백엔드 OAuth API 호출
  useEffect(() => {
    if (!code) return;
    signInWithGoogleOAuth(code)
      .then(() => navigate('/'))
      .catch(() => navigate('/error'));
  }, [code]);

  // Google OAuth API에서 에러를 반환한 경우
  if (error || !code) {
    const errorMsg = `에러가 발생했습니다. (${error})`;
    navigate(`/error?msg=${errorMsg}`);
    return <></>;
  }

  return (
    <>
      <CircularProgress />
    </>
  );
}
