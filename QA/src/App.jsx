import React from 'react'
import SignIN from './pages/signIn/SignIn';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Amplify } from 'aws-amplify';
import { awsConfig } from './aws/aws-exports.js';

import MainLayout from "./components/MainLayout/Mainlayout.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import Tickets from './pages/tickets/tickets.jsx';
import Users from "./pages/users/users.jsx";

Amplify.configure(awsConfig);

const App = () => {
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<SignIN />} />
          <Route path="/" element={<MainLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App