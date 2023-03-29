import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

/**
 * 기본 페이지 레이아웃입니다.
 */
function DefaultLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default DefaultLayout;
