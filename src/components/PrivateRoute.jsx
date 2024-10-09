import React from 'react';
import { Navigate } from 'react-router-dom';
import useStore from './Store';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
