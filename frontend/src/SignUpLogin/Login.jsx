import React from 'react'
import SignUpLoginHeader from './components/SignUpLoginHeader'
import SignUpLoginMain from './components/SignUpLoginMain'
import SignUPLoginForm from './components/SignUPLoginForm'
// import {loginImg} from '../../public/loginPageImg.png'

function Login() {
  const login = 'login';
  return (
    <div className='flex'>
      <div className='basis-1/2 h-dvh'>
        {/* Login Navbar */}
        <SignUpLoginHeader/>
        <div className='form-main-container'>
          {/* Lexient header and continue with google */}
          <SignUpLoginMain page={login}/>

          {/* Login Form */}
          <SignUPLoginForm page={login}/>
        </div>
      </div>
      <div className='basis-1/2 flex items-center justify-center'>
        <img className='h-140' src='/loginPageImg.png' alt="" />
      </div>
    </div>
  )
}

export default Login