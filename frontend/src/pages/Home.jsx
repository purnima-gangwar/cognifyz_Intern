import React, {useContext} from 'react'
import  { dataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Home() {
    let {userData,setUserData,getUserData,serverUrl}=useContext(dataContext)
    let navigate=useNavigate() 
    if(!userData) {
        navigate("/login")
    }

    const handleLogOut=async()=>{
        try{
           let data= await axios.post(serverUrl + "/api/logout",{},{
                withCredentials:true
           })
           setUserData(null)
        } catch (error){
            console.log(error);
            
        }
    }
    
  return (
    <div className='w-full h-screen bg-black flex flex-col justify-center items-center gap-[20px]'>
        <div className='w-[100px] h-[100px] rounded-full bg-white overflow-hidden relative border-2 border-white'>
            <img src={userData.profileImage} alt='' className='w-[100%] h-[100%] '/>
          </div>

        <p className='text-white text-[20px]'>Hello, <span className='text-[#0ce0e7] text-[25px] font-semibold'>{userData.firstName}</span>,Welcome to the Webpage</p>
        <button className='bg-blue-900 text-white px-[10px] py-[5px] rounded-lg' onClick={handleLogOut}>Log out</button>
      
    </div>
  )
}

export default Home
