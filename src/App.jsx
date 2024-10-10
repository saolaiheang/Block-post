import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Blogmodule from './pages/Blogmodule';
import NotFound from './components/Notfound';
// import PrivateRoute from './components/PrivateRoute';
import './index.css';
import Login from './pages/Login';
import SignUp from './pages/Register';
import UserProfile from './pages/UserAccount';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<UserProfile />} />
     
        <Route path="/blogmodule" element={<Blogmodule />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
