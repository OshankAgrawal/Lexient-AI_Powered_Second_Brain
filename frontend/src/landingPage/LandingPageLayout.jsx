import React from 'react'
import HomePage from './HomePage'
import NavBar from './NavBar'

function LandingPageLayout() {
  return (
    <div className='box-border'>
        <NavBar/>
        <HomePage/>
    </div>
  )
}

export default LandingPageLayout