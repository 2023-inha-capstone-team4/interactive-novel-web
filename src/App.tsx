import { Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';

// MUI를 위한 Roboto 폰트 로드
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MainPage from './pages/MainPage';
import SearchPage from './pages/SearchPage';
import { ThemeProvider, createTheme } from '@mui/material';

// MUI Theme
const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#ff6868',
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
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
