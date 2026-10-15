import React from 'react'

function NavBar() {
    return (
        <div className='w-full flex-center fixed p-1'>
            <div className='flex-center gap-2'>
                {/* account pic */}
                <div className='flex-center rounded-full bg-amber-500 p-1 w-8'>
                    P
                </div>
                {/* notifications */}
                <div className='flex-center rounded-full bg-amber-800 p-1 w-8'>
                    N
                </div>
            </div>
        </div>
  )
}

export default NavBar