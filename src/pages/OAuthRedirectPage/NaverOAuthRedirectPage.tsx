import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { signInWithNaverOAuth } from '../../services/auth-service';
import { CircularProgress } from '@mui/material';

export default function NaverOAuthRedirectPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  // 백엔드 OAuth API 호출
  useEffect(() => {
    const errorMsg = '로그인 중 에러가 발생했습니다.';

    // 네이버 OAuth API에서 에러를 반환한 경우
    if (error) {
      navigate(`/error?msg=${errorMsg} (${errorDescription})`);
      return;
    }

    if (!code) {
      navigate(`/error?msg=${errorMsg}`);
      return;
    }

    // 돌아온 state 값이 저장해둔 state와 다른 경우
    const savedState = localStorage.getItem('naver-oauth-state');
    localStorage.removeItem('naver-oauth-state');
    if (!state || state != savedState) {
      navigate(`/error?msg=${errorMsg}`);
      return;
    }

    signInWithNaverOAuth(code, state)
      .then(() => navigate('/'))
      .catch(() => navigate(`/error?msg=${errorMsg}`));
  }, [code]);

  return (
    <>
      {/* <CircularProgress /> */}
      <p>code : {code}</p>
      <p>state : {state}</p>
      <p>error : {error}</p>
      <p>error_description : {errorDescription}</p>
    </>
  );
}
