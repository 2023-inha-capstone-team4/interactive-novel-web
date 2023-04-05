import { Box, IconButton, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import TabPanel from '../../components/TabPanel';
import Signin from './Signin';
import Signup from './Signup';
import styled from '@emotion/styled';
import SocialLogin from './SocialLogin';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import PlainStyleLink from '../../components/PlainStyleLink';
import { useNavigate } from 'react-router-dom';

/**
 * 로그인/회원가입 페이지입니다.
 */
function SigninPage() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Container>
      <SigninHeader />
      <Tabs value={currentTab} onChange={handleTabChange} centered>
        <Tab label="로그인" value={0} />
        <Tab label="회원가입" value={1} />
      </Tabs>
      <TabPanels>
        <TabPanel index={0} value={currentTab}>
          <Signin />
        </TabPanel>
        <TabPanel index={1} value={currentTab}>
          <Signup />
        </TabPanel>
      </TabPanels>
      <SocialLogin />
    </Container>
  );
}

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding-top: 15px;
`;

const TabPanels = styled.div`
  padding: 20px 15px;
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
        <PlainStyleLink to="/">LOGO</PlainStyleLink>
      </Box>
    </Box>
  );
}

export default SigninPage;
