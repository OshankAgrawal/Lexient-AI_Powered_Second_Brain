import React from 'react'
import { NavLink } from 'react-router'

function AsideBar() {
    return (
    <div>
      <NavLink to="upload">Upload Files</NavLink>
      <NavLink to="stats">See Your Stats</NavLink>
      <NavLink to="your-tests">Give Test</NavLink>
      <NavLink to="flashcards">All Flashcards</NavLink>
      <NavLink to="timeline">Your Timeline</NavLink>
      <NavLink to="chat">Chat with AI</NavLink>
    </div>
  )
}

export default AsideBar