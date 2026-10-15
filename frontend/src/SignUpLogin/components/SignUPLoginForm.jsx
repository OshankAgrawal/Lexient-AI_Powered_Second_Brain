import React from 'react'
import { Form, Link } from 'react-router'


function SignUPLoginForm({page}) {
  return (
    <div className='flex flex-col w-full'>
        {page==='signup'?
        <Form>
            {/* make the text left aligned */}
            <div className='form-div'>
                <label htmlFor="SignUpUsername" className='form-label'>
                Username
                </label>
                <input id='SignUpUsername' name='SignUpUsername' type="text" placeholder='Adam' required className='form-input'/>
            </div>
            <div className='form-div'>
                <label htmlFor="SignUpEmail" className='form-label'>
                Email
                </label>
                <input id='SignUpEmail' name='SignUpEmail' type="email" placeholder='abc@email.com' required className='form-input'/>
            </div>
            <div className='form-div'>
                <label htmlFor="SignUpPassword" className='form-label'>
                Password
                </label>
                <input id='SignUpPassword' name='SingUpPassword' type="password" placeholder='********' required className='form-input'/>
            </div>
            <div className='mb-15 form-div bg-primary-text text-background p-2 hover:bg-pink-800 hover-theme-shadow'>
                <button type="submit" className='text-lg'>SignUp</button>
            </div>
        </Form>
        :
        <Form>
            {/* make the text left aligned */}
            <div className='form-div'>
                <label htmlFor="SignUpEmail" className='form-label'>
                Email
                </label>
                <input id='SignUpEmail' name='SignUpEmail' type="email" placeholder='abc@email.com' required className='form-input'/>
            </div>
            <div className='form-div'>
                <label htmlFor="SignUpPassword" className='form-label'>
                Password
                </label>
                <input id='SignUpPassword' name='SingUpPassword' type="password" placeholder='********' required className='form-input'/>
            </div>
            <div className='form-label text-neutral-900 mb-3'>
                <Link to='/forgotpassword'>forgot password?</Link>
            </div>
            <div className='mb-15 form-div bg-primary-text text-background p-2 hover:bg-pink-800 hover-theme-shadow'>
                <button type="submit" className='text-lg'>Login</button>
            </div>
        </Form>
        }
    </div>
  )
}

export default SignUPLoginForm