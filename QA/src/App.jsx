import React from 'react'
import SignIN from './pages/signIn/SignIn';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Amplify } from 'aws-amplify';
import { awsConfig } from './aws/aws-exports.js';

Amplify.configure(awsConfig);

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route path='login' element={<SignIN />}></Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App