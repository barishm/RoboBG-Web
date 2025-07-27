import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Compare from './pages/Compare'
import Robots from './pages/Robots'
import Robot from './pages/Robot'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register';
import Dashboard from './pages/Dashboard'
import ProtectedRoutes from './app/ProtectedRoutes';
import { Routes, Route } from "react-router-dom";
import Contact from './pages/Contact'
import useAuth from './hooks/useAuth'
import { useState, useEffect } from 'react'
import Consumables from './pages/Consumables'
import Consumable from './pages/Consumable'
import { PhotoProvider, PhotoView } from 'react-photo-view';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import PasswordReset from './pages/PasswordReset'
import ForgotPassword from './pages/ForgotPassword'
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import config from './app/chatBot/chatbotConfig'
import MessageParser from './app/chatBot/MessageParser'
import ActionProvider from './app/chatBot/ActionProvider'
import { disableChatInput } from './app/chatBot/chatUtils'
import "./styles/chatbot.css";

function App() {
  const [dashboardsActiveComponent, setDashboardsActiveComponent] = useState("Robots");
  useAuth();
  const [showBot, toggleBot] = useState(false);

    useEffect(() => {
    if (showBot) {
      setTimeout(() => {
        disableChatInput();
      }, 1);
    }
  }, [showBot]);


  return (
    <div className="App">
      <ToastContainer />
      <PhotoProvider>
        <Header setDashboardsActiveComponent={setDashboardsActiveComponent} />
        <main>
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
        <div className='chatBotSection'>
          {showBot && (
            <div className="chatbotWindow">
              <Chatbot
                config={config}
                headerText='Чат с РобоАсистент'
                placeholderText='Напишете съобщението си тук'
                messageParser={MessageParser}
                actionProvider={ActionProvider}
              />
            </div>
          )}
          <button className='chatBotToggleBtn' onClick={() => toggleBot((prev) => !prev)}>
            <img src="/images/chatBotAvatar.png" alt="Chatbot Avatar" />
          </button>
        </div>
        <Footer />
      </PhotoProvider>
    </div>
  );
}

export default App;
