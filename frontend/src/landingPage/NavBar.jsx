import React from 'react'
import {NavLink} from "react-router"

function NavBar() {
  return (
    <header>
      <nav className='h-13 flex justify-between items-center px-12 mx-50 mt-3 border rounded-xl'>
        <span className='font-montenegrin-gothic-one text-4xl text-primary-text'>
          LEXIENT
        </span>
        <span>
          <NavLink to="/signup" className="font-geist-pixel text-navBtn hover:underline underline-offset-4 mr-10 text-accent hover:text-neutral-800">SignUp</NavLink>
          <NavLink to="/login" className="font-geist-pixel text-navBtn hover:underline underline-offset-4 text-accent hover:text-neutral-800">Login</NavLink>
        </span>
      </nav>
    </header>
  )
}

export default NavBar