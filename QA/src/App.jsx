import React from 'react'
import SignIN from './pages/signIn/SignIn';
import { Route, Routes, BrowserRouter } from 'react-router-dom'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<SignIN />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App