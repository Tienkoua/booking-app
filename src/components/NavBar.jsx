import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
const NavBar = () => {
  const {user} = useContext(AuthContext)
  return (
    <div className='h-12 bg-blue-900 flex justify-center'>
        <div className='flex items-center  w-full max-w-5xl text-white justify-between'>
          <Link to="/" >
            <span className='font-bold'>tienkbooking</span>
          </Link>
          {user ? user.username : (

            <div>
                <button className='ml-5 py-1.5 px-2.5 cursor-pointer text-blue-900 bg-gray-300'>Register</button>
                <button className='ml-5 py-1.5 px-2.5 cursor-pointer text-blue-900 bg-gray-300'>Login</button>
            </div>
           )}
        </div>
    </div>
  )
}

export default NavBar