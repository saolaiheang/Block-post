import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css'
import Login from './pages/Login';
<<<<<<< HEAD
import SignUp from './pages/Register';
import UserProfile from './pages/UserAccount';
=======
>>>>>>> origin/feature/signup

import SignUp from './pages/Register';
import NotFound from './components/Notfound';
import PrivateRoute from './components/PrivateRoute';
import Blogmodule from './pages/Blogmodule';

function App() {
  return (

    <Router>
      <Routes>
    <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
<<<<<<< HEAD
          <Route path="/user" element={<UserProfile />} />
        </Routes>
      </Router>
    </>
  )
=======
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
>>>>>>> origin/feature/signup
}

export default App;
