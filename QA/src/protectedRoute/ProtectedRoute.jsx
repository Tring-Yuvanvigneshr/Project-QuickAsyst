import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { fetchAuthSession  } from 'aws-amplify/auth';
import { CircularProgress } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await fetchAuthSession();
        const isValid = session && session.tokens?.idToken?.toString();

        setIsAuthenticated(!!isValid);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <CircularProgress />;
  }


  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
