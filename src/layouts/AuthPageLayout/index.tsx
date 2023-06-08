import { Box, IconButton, Tab, Tabs } from '@mui/material';
import styled from '@emotion/styled';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from './SocialLogin';
import PlainStyleLink from '../../components/PlainStyleLink';

/**
 * 로그인/회원가입 페이지입니다.
 */
function AuthPageLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue, { replace: true });
  };

  return (
    <Container>
      <SigninHeader />
      <Tabs value={pathname} onChange={handleTabChange} centered>
        <Tab label="로그인" value={'/sign/in'} />
        <Tab label="회원가입" value={'/sign/up'} />
      </Tabs>
      <Box paddingX="20px" paddingY="15px">
        <Outlet />
      </Box>
      <SocialLogin />
    </Container>
  );
}

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding-top: 15px;
`;

function SigninHeader() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Box>
      <IconButton onClick={goBack}>
        <ArrowBackRoundedIcon />
      </IconButton>
      <Box textAlign="center" paddingTop={2} paddingBottom={5}>
        <PlainStyleLink to="/">
          <b style={{ fontWeight: 800 }}>Interactive Novels</b>
        </PlainStyleLink>
      </Box>
    </Box>
  );
}

export default AuthPageLayout;
