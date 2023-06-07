import { Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';

import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import { Alert, Snackbar, ThemeProvider, createTheme } from '@mui/material';
import NovelDetailPage from './pages/NovelDetailPage';
import ErrorPage from './pages/ErrorPage';
import { COLOR_PRIMARY } from './utils/constant';
import PublisherPage from './pages/PublisherPage';
import BookmarkPage from './pages/BookmarkPage';
import NovelViewerPage from './pages/NovelViewerPage';
import AuthPageLayout from './layouts/AuthPageLayout';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import MyPage from './pages/MyPage';
import GoogleOAuthRedirectPage from './pages/OAuthRedirectPage/GoogleOAuthRedirectPage';

// MUI를 위한 Roboto 폰트 로드
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import NaverOAuthRedirectPage from './pages/OAuthRedirectPage/NaverOAuthRedirectPage';
import { createContext, useState } from 'react';
import { AlertAPI, AlertAPIContext } from './utils/alert';

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
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleAlertClose = () => {
    setAlert(false);
    setAlertMessage('');
  };

  const showAlert: AlertAPI = (message: string) => {
    setAlertMessage(message);
    setAlert(true);
  };

  return (
    <div className="App">
      <ThemeProvider theme={muiTheme}>
        <AlertAPIContext.Provider value={showAlert}>
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
            <Route path="/oauth">
              <Route path="/oauth/google" element={<GoogleOAuthRedirectPage />} />
              <Route path="/oauth/naver" element={<NaverOAuthRedirectPage />} />
            </Route>
            <Route path="/novel/viewer/:episodeId" element={<NovelViewerPage />} />
            <Route path="/" element={<DefaultLayout />}>
              <Route path="/error" element={<ErrorPage />} />
              <Route path="*" element={<ErrorPage msg="존재하지 않는 페이지입니다." />} />
            </Route>
          </Routes>
        </AlertAPIContext.Provider>
        <Snackbar open={alert} autoHideDuration={5000} onClose={handleAlertClose}>
          <Alert severity="error">{alertMessage}</Alert>
        </Snackbar>
      </ThemeProvider>
    </div>
  );
}

export default App;
