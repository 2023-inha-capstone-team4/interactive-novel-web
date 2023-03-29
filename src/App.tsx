import { Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';

// MUI를 위한 Roboto 폰트 로드
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          {/* Subroutes */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
