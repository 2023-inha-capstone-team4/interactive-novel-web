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

  /* 스크롤 바 */
  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ff6868;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(244, 86, 33, 0.1);
  }

  /* 좁은 화면에서 스크롤 바 숨기기 */
  @media (max-width: 700px) {
    -ms-overflow-style: none; /* IE */
    scrollbar-width: none; /* Firefox */
    /* Chrome */
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export default DefaultLayout;
