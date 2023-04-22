import { Box } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { COLOR_PRIMARY } from '../../utils/constant';

function ErrorPage(props: ErrorPageProps) {
  const [searchParams] = useSearchParams();
  const msg = props.msg ?? searchParams.get('msg') ?? '에러가 발생했습니다.';

  return (
    <Box marginY="200px" textAlign="center">
      <p>{msg}</p>
      <Link
        to="/"
        style={{
          textDecoration: 'none',
          color: COLOR_PRIMARY,
        }}
      >
        홈으로 이동
      </Link>
    </Box>
  );
}

interface ErrorPageProps {
  msg?: string;
}

export default ErrorPage;
