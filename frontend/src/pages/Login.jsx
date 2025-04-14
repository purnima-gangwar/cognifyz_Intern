import React, { useContext, useState } from 'react'
import { dataContext } from '../context/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { getUserData } from '../../../backend/controllers/auth'

function Login() {
  let { serverUrl,userData,setUserdata,getUserData } = useContext(dataContext)
  let navigate = useNavigate()

  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      let {data} = await axios.post(serverUrl + "/api/login", {
        email,
        password
      }, { withCredentials: true })
      setUserdata(data.user)
      await getUserData()
      if(userData) {
        navigate("/")
      }
  
    } catch (error) {
      alert(error.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className='w-full h-[100vh] bg-slate-700 flex justify-center items-center'>
      <div className='w-[90%] max-w-[500px] h-[600px] bg-white rounded flex flex-col justify-center items-center gap-[20px]'>
        <h1 className='text-blue-900 text-[30px] italic font-bold'>Login</h1>
        <form className='w-[100%] flex flex-col items-center justify-center gap-[20px]' onSubmit={handleLogin}>
          <input
            type="text"
            placeholder='email'
            className='w-[80%] h-[50px] bg-white outline-none border border-gray-400 rounded-lg px-[10px] py-[5px]'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder='password'
            className='w-[80%] h-[50px] bg-white outline-none border border-gray-400 rounded-lg px-[10px] py-[5px]'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='bg-blue-900 text-white px-[9px] py-[6px] rounded-lg'>Log in</button>
          <p className='text-black cursor-pointer' onClick={() => navigate("/signup")}>
            Create new account? <span className='text-[#0ed3e1]'>Sign Up</span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login;
