import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials,setCredentials] = useState({
        username:undefined,
        password:undefined
    })

    const {user,loading,error,dispatch} = useContext(AuthContext);

    const navigate = useNavigate()

    const handleChange = (e)=>{
      setCredentials((prev)=>({...prev,[e.target.id]:e.target.value }))
    }

    const handleClick = async e=>{
      e.preventDefault()
      dispatch({type:"LOGIN_START"})

      try {

        const res = await axios.post("/auth/login",credentials)
        if(res.data.isAdmin){

          dispatch({type:"LOGIN_SUCCESS",payload:res.data.details})
          navigate('/')
        }else{
          dispatch({
            type:"LOGIN_FAILURE",
            payload:{message:"You are not allowed!"}
          })
        }
       
        
      } catch (error) {
        dispatch({type:"LOGIN_FAILURE",payload:error.response.data})
      }
    }

  
  return (
    <div className='flex h-screen items-center justify-center'>
        <div className='flex flex-col w-64 gap-2.5'>
            <input type="text" placeholder='username' id='username' onChange={handleChange} className="p-2.5 border" />
            <input type="text" placeholder='password' id='password' onChange={handleChange} className="p-2.5 border"/>
            <button onClick={handleClick} className="border-none py-2.5 px-5 text-white font-bold cursor-pointer rounded-md bg-blue-500">Login</button>
            {error && <span>{error.message}</span>}
        </div>
    </div>
  )
}

export default Login