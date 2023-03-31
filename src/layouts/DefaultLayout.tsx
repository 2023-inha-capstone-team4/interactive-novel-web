import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from '@emotion/styled';

/**
 * 기본 페이지 레이아웃입니다.
 */
function DefaultLayout() {
  return (
    <Background>
      <Content>
        <Header />
        <Outlet />
        <Footer />
      </Content>
    </Background>
  );
}

const Background = styled.div`
  background-color: #f2f2f2;
`;

const Content = styled.div`
  height: 100vh;
  max-width: 700px;
  margin: 0 auto;
  background-color: #ffffff;
  overflow-y: scroll;
`;

export default DefaultLayout;
