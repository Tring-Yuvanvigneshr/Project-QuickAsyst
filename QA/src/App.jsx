import React from 'react';
import SignIN from './pages/signIn/SignIn';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Amplify } from 'aws-amplify';
import { awsConfig } from './aws/aws-exports.js';
import ProtectedRoute from './protectedRoute/ProtectedRoute.jsx';
import MainLayout from "./components/MainLayout/Mainlayout.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import Tickets from './pages/tickets/tickets.jsx';
import Users from "./pages/users/users.jsx";

import Profile from './pages/profile/Profile.jsx';

import { ApolloProvider } from '@apollo/client';
import client from './api/client.js';

Amplify.configure(awsConfig);

const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <ToastContainer position="top-center" autoClose={3000} />
          <Routes>
            <Route path='login' element={<SignIN />} />
            <Route path="/" element={<MainLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="tickets" element={<Tickets />} />
              <Route path="users" element={<Users />} />
              <Route path='profile' element={<Profile />} />

              {/* <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="tickets" element={<ProtectedRoute><Tickets /></ProtectedRoute>} />
              <Route path="users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
              <Route path='profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </>
  )
}

export default App