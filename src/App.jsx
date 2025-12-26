import './App.css'
import Header from 'src/components/common/Header'
import Footer from 'src/components/common/Footer'
import CookieConsent from 'src/components/common/CookieConsent'
import Home from 'src/pages/Home'
import Compare from 'src/pages/Compare'
import Robots from 'src/pages/Robots'
import Robot from 'src/pages/Robot'
import Profile from 'src/pages/Profile'
import Login from 'src/pages/Login'
import Register from 'src/pages/Register';
import Dashboard from 'src/pages/Dashboard'
import ProtectedRoutes from 'src/app/ProtectedRoutes';
import { Routes, Route } from "react-router-dom";
import Contact from 'src/pages/Contact'
import useAuth from 'src/hooks/useAuth'
import { useState, useEffect } from 'react'
import Consumables from 'src/pages/Consumables'
import Consumable from 'src/pages/Consumable'
import { PhotoProvider } from 'react-photo-view';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import PasswordReset from 'src/pages/PasswordReset'
import ForgotPassword from 'src/pages/ForgotPassword'
import ChatbotComponent from 'src/components/common/ChatbotComponent'

function App() {
  const [dashboardsActiveComponent, setDashboardsActiveComponent] = useState("Robots");
  useAuth();


  return (
    <div className="App">
      <ToastContainer />
      <PhotoProvider>
        <Header setDashboardsActiveComponent={setDashboardsActiveComponent} />
        <main style={{background: 'rgba(233, 233, 233, 0.95)'}}>
          <Routes>
            <Route path='/password-reset' element={<PasswordReset />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/' element={<Home />} />
            <Route path='/compare' element={<Compare />} />
            <Route path='/robots' element={<Robots />} />
            <Route path='/consumables' element={<Consumables />} />
            <Route path='/robots/:id' element={<Robot />} />
            <Route path='/consumables/:id' element={<Consumable />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route element={<ProtectedRoutes />}>
              <Route path='/dashboard' element={<Dashboard dashboardsActiveComponent={dashboardsActiveComponent} />} />
            </Route>
          </Routes>
        </main>
        {/* <ChatbotComponent /> */}
        <Footer />
        <CookieConsent />
      </PhotoProvider>
    </div>
  );
}

export default App;
