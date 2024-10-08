import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import Login from './pages/Login';
import SignUp from './pages/Sign-up';
import NotFound from './components/Notfound';
import PrivateRoute from './components/PrivateRoute';
import Blogmodule from './pages/Blogmodule';
function App() {
  return (

    <Router>
      <Routes>
    <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
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
