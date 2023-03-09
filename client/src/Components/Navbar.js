import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("user")
    navigate('/')
  }
  return (
    <div>
      <div className='w-full h-16 px-20 flex justify-between bg-white'>
        <h1 className='text-blue-700 text-2xl font-extrabold my-auto'>HomePage</h1>
        <div className='flex justify-evenly w-4/12'>
          <p className='my-auto text-base font-serif text-blue-700 cursor-pointer'>Home</p>
          <p className='my-auto text-base font-serif text-blue-700 cursor-pointer'>About</p>
          <p className='my-auto text-base font-serif text-blue-700 cursor-pointer'>Contact</p>
        </div>
        <button onClick={logout} className='bg-blue-700 my-auto p-1 rounded text-white font-semibold'>LogOut</button>
      </div>
    </div>
  )
}

export default Navbar