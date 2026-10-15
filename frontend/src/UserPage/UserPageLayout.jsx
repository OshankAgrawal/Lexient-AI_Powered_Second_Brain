import { Outlet } from 'react-router'
import AsideBar from './AsideBar'
import NavBar from './NavBar'

function UserPageLayout() {
  return (
    <div>
      {/* nav div */}
      <div className='w-full h-16 border flex-center'>
        <NavBar />
      </div>

      <div>
      {/* this will contain aside and different pages */}
      <div className='flex'>
        {/* aside div */}
        <aside
          className='basis-1/6 border p-2'
          aria-label="User dashboard"
        >
          <AsideBar />
        </aside>

        {/* page div */}
        <div className='basis-5/6 border p-2'>
          <Outlet />
        </div> 
      </div>

      </div>
    </div>
  )
}

export default UserPageLayout