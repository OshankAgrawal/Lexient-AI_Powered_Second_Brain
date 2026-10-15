import { Outlet } from 'react-router'
import AsideBar from './AsideBar'
import NavBar from './NavBar'

function UserPageLayout() {
  return (
    // 1. Lock the outer screen: h-screen instead of min-h-screen, overflow-hidden stops window scrolling
    <div className='flex flex-col h-screen w-screen overflow-hidden bg-background'>
      {/* 2. Nav div: shrink-0 guarantees navbar never squishes */}
      <div className='w-full h-16 border-b border-accent/20 flex-center shrink-0'>
        <NavBar />
      </div>

      {/* 3. Main workspace: min-h-0 and overflow-hidden prevent children from expanding the page */}
      <div className='flex flex-1 w-full min-h-0 overflow-hidden'>
        {/* Aside div */}
        <aside
          className='basis-1/6 border-r border-accent/20 p-2 h-full min-h-0 overflow-hidden'
          aria-label="User dashboard"
        >
          <AsideBar />
        </aside>

        {/* Page content area: h-full, min-h-0, overflow-hidden */}
        <main className='basis-5/6 p-4 h-full min-h-0 overflow-hidden flex flex-col'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default UserPageLayout