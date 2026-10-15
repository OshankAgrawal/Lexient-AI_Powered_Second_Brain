import React from 'react'
import { NavLink } from 'react-router'

function AsideBar() {
  const getNavClasses = ({ isActive }) =>
    `w-4/5 py-2.5 px-4 text-center text-sm font-medium rounded-xl transition-all duration-200 ${
      isActive
        ? 'bg-amber-900 text-white shadow-sm'
        : 'text-stone-700 hover:bg-stone-300/80 hover:text-stone-900'
  }`

  return (
  <div className='grid grid-cols-1 auto-rows-auto items-center justify-items-center h-full'>
    <NavLink className={getNavClasses} to="stats">See Your Stats</NavLink>
    <NavLink className={getNavClasses} to="upload">Upload Files</NavLink>
    <NavLink className={getNavClasses} to="your-tests">Give Test</NavLink>
    <NavLink className={getNavClasses} to="flashcards">All Flashcards</NavLink>
    <NavLink className={getNavClasses} to="timeline">Your Timeline</NavLink>
    <NavLink className={getNavClasses} to="chat">Chat with AI</NavLink>
  </div>
  )
}

export default AsideBar