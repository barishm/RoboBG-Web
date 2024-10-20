import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home/Home'
import Compare from './pages/Compare/Compare'
import Robots from './pages/Robots/Robots'
import Robot from './pages/Robot/Robot'
import Profile from './pages/Profile/Profile'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard'
import ProtectedRoutes from './app/ProtectedRoutes';
import { Routes,Route } from "react-router-dom";
import { useEffect } from "react";
import { useReauthMutation } from './app/services/authApiSlice'
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux'
import { setCredentials, logOut } from './app/redux/authSlice'
import Contact from './pages/Contact/Contact'

function App() {
  const [reauth] = useReauthMutation()
  const dispatch = useDispatch()
  let updateToken = async () => {
    try {
      if (localStorage.getItem("refreshToken")) {
        const refreshTokenWithQuotes = localStorage.getItem("refreshToken");
        const refreshToken = refreshTokenWithQuotes.replace(/^"(.*)"$/, '$1');
        const userData = await reauth(refreshToken);
        const decoded = jwtDecode(userData.data.access_token);
        const user = decoded.sub;
        const role = decoded.role;
        const accessToken = userData.data.access_token;
        dispatch(setCredentials({ user, role, accessToken }))
      }
    } catch (error) {
      console.error('Error while refreshing token:', error);
      dispatch(logOut());
      localStorage.clear();
    }
  };
  useEffect(() => {
    updateToken();
  }, []);
  useEffect(() => {
    const tokenInterval = setInterval(() => {
      updateToken();
    }, 900000);
    return () => clearInterval(tokenInterval);
  }, [dispatch]);
  
  
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/compare' element={<Compare/>}/>
        <Route path='/robots' element={<Robots/>}/>
        <Route path='/robots/:id' element={<Robot/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/login'  element={<Login/>}/>
        <Route path='/register'  element={<Register/>}/>
        <Route element={<ProtectedRoutes/>}>
        <Route path='/dashboard' element={<Dashboard/>}/>
        </Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
