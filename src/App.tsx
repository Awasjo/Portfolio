import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JourneyPage from './pages/JourneyPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/journey" element={<JourneyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
