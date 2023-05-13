import { Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';

import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import { ThemeProvider, createTheme } from '@mui/material';
import NovelDetailPage from './pages/NovelDetailPage';
import ErrorPage from './pages/ErrorPage';
import { COLOR_PRIMARY } from './utils/constant';
import PublisherPage from './pages/PublisherPage';
import BookmarkPage from './pages/BookmarkPage';
import NovelViewerPage from './pages/NovelViewerPage';
import AuthPageLayout from './layouts/AuthPageLayout';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

// MUI를 위한 Roboto 폰트 로드
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MyPage from './pages/MyPage';

// MUI Theme
const muiTheme = createTheme({
  palette: {
    primary: {
      main: COLOR_PRIMARY,
      contrastText: '#ffffff',
    },
  },
  shape: {
    borderRadius: 8,
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={muiTheme}>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/novel/:id" element={<NovelDetailPage />} />
            <Route path="/publisher/:id" element={<PublisherPage />} />
            <Route path="/bookmark" element={<BookmarkPage />} />
            <Route path="/my" element={<MyPage />} />
          </Route>
          <Route path="/sign" element={<AuthPageLayout />}>
            <Route path="/sign/in" element={<SignInPage />} />
            <Route path="/sign/up" element={<SignUpPage />} />
          </Route>
          <Route path="/novel/viewer/:id" element={<NovelViewerPage />} />
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<ErrorPage msg="존재하지 않는 페이지입니다." />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
