import { Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';

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
