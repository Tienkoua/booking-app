import React from 'react'

const MailList = () => {
  return (
    <div className='w-full mt-12 bg-blue-900 text-white flex flex-col items-center gap-5 p-12'>
      <h1 className='text-3xl font-bold'>Save time, save money</h1>
      <span>Sign up we will send the best deal to you</span>
      <div>
        <input className='w-80 h-12 p-3 border-none mr-3 rounded-md' type="text"  placeholder='Your Email' name="email" id="" />
        <button className='h-12 bg-blue-600 text-white font-medium border-none rounded-md cursor-pointer p-3'>Subscribe</button>
      </div>
    </div>
  )
}

export default MailList