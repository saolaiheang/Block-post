import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import Login from './pages/Login';
import SignUp from './pages/Register';
import UserProfile from './pages/UserAccount';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user" element={<UserProfile />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
