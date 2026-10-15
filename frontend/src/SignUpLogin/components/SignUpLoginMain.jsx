import React from 'react'
import {Link} from 'react-router'
import { FaGoogle } from "react-icons/fa";

function SignUpLoginMain({page}) {
  return (
    <div>
        <p className='text-4xl font-semibold font-montenegrin-gothic-one text-primary-text'>Lexient</p>
        {page==='signup'?
        <p className='text-neutral-600'>This is the start of someting good.</p>
        :
        <p className='text-neutral-600'>Hi welcome back, Good to see you</p>
        }
        {page==='signup'? 
        <Link to="/login" className='inline-flex border rounded-2xl mt-4 bg-card-surface/50 hover-theme-shadow mb-15'>
            <div className='bg-neutral-900 text-neutral-200 px-6 py-1 border-none rounded-2xl'>
                Register
            </div>
            <div className='px-4 flex-center'>
                Login
            </div>
        </Link>
        :
        <Link to="/signup" className='inline-flex border rounded-2xl mt-4 bg-card-surface/50 hover-theme-shadow mb-15'>
            <div className='px-3 flex-center'>
                Register
            </div>
            <div className='bg-neutral-900 text-neutral-200 px-7 py-1 border-none rounded-2xl'>
                Login
            </div>
        </Link>
        }

        {/* Continue with google */}
        <div className='flex-center border rounded-2xl px-3 py-1 mb-3 hover-theme-shadow hover:bg-primary-text hover:text-background'>
            {/* icon of google */}
            <div className='flex-center p-1'>
            <FaGoogle className='h-full w-full'/>
            </div>
            <div className='flex-center'>
            Continue with Google
            </div>
        </div>


        <div className="flex items-center w-full mb-3">
            {/* Left Line */}
            <div className="flex-1 border-t border-neutral-400"></div>
            {/* Text */}
            <span className="px-3 text-neutral-700 font-medium">or</span>
            {/* Right Line */}
            <div className="flex-1 border-t border-neutral-400"></div>
        </div>
    </div>
  )
}

export default SignUpLoginMain