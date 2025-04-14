import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'


import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import { dataContext } from './context/UserContext';

function App() {
  let {userData,setUserData}=useContext(dataContext)
  console.log(userData);
  return (
    <Routes>
    <Route path='/signup' element={<SignUp />} />
    <Route path='/login' element={<Login />} />
    <Route path='/' element={userData?<Home/>:<Login/>}/>
  </Routes>
  
  );
}

export default App;
