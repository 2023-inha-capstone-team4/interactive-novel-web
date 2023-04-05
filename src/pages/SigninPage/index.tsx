import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import TabPanel from '../../components/TabPanel';
import Signin from './Signin';
import Signup from './Signup';
import styled from '@emotion/styled';

/**
 * 로그인/회원가입 페이지입니다.
 */
function SigninPage() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <>
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
    </>
  );
}

const TabPanels = styled.div`
  padding: 20px 15px;
`;

export default SigninPage;
