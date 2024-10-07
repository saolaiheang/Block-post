import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './components/Notfound';
import PrivateRoute from './components/PrivateRoute';
import Blogmodule from './pages/Blogmodule';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
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
