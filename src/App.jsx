import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Blogmodule from './pages/Blogmodule'
import NotFound from './components/Notfound';
import PrivateRoute from './components/PrivateRoute';
// import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Blogmodule/>} />
        <Route
          path="/blogmodule"
          element={
            <PrivateRoute>
              <Blogmodule />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
