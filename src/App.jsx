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
import { Routes,Route } from "react-router-dom";
import Contact from './pages/Contact'
import useAuth from './hooks/useAuth'
import { useState } from 'react'
import Consumables from './pages/Consumables'
import Consumable from './pages/Consumable'

function App() {
  const [dashboardsActiveComponent, setDashboardsActiveComponent] = useState("Robots");
  useAuth();
  
  return (
    <div className="App">
      <Header setDashboardsActiveComponent={setDashboardsActiveComponent} />
      <main>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/compare' element={<Compare/>}/>
        <Route path='/robots' element={<Robots/>}/>
        <Route path='/consumables' element={<Consumables/>}/>
        <Route path='/robots/:id' element={<Robot/>}/>
        <Route path='/consumables/:id' element={<Consumable/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/login'  element={<Login/>}/>
        <Route path='/register'  element={<Register/>}/>
        <Route element={<ProtectedRoutes/>}>
        <Route path='/dashboard' element={<Dashboard dashboardsActiveComponent={dashboardsActiveComponent} />}/>
        </Route>
      </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
