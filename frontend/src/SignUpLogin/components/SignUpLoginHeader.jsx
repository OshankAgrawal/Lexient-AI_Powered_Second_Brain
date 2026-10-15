import React from 'react'
import { PiCirclesFourFill } from "react-icons/pi";
import { NavLink } from 'react-router';


function SignUpLoginHeader() {
  return (
    <div className='py-5 px-10'>
      <NavLink to="/" className='rounded-2xl inline-flex p-1 border py-1 pr-3 hover-theme-shadow'>
        <div className='border rounded-full p-1 mr-2 flex justify-center items-center'>
            <PiCirclesFourFill/>
        </div>
        <div className='mr-2 flex items-center'>Back to Home</div>
      </NavLink>
    </div>
  )
}

export default SignUpLoginHeader