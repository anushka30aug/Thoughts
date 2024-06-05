import React from 'react';
import './App.css';
import NoteState from './Context/NoteState';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './Components/About';
import Login from './Components/Login';
import Signup from './Components/Signup';
import AuthState from './Context/authState';
import Forget from './Components/ForgetPassword';
import Email from './Components/Email';
import Newpassword from './Components/NewPassword';
import Footer from './Components/Footer';
function App() {
  return (
    <>
      <BrowserRouter>
        <NoteState>
          <AuthState>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/forget' element={<Forget />} />
              <Route path='/email' element={<Email />} />
              <Route path='/setpassword' element={<Newpassword />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/about' element={<About />} />
            </Routes>
          </AuthState>
        </NoteState>
        <Footer/>
      </BrowserRouter>

    </>
  );
}

export default App;
