import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router'
import LandingPageLayout from './landingPage/LandingPageLayout'
import Login from './SignUpLogin/Login'
import SignUp from './SignUpLogin/SignUp'
import ForgotPassword from './SignUpLogin/ForgotPassword'
import UserPageLayout from './UserPage/UserPageLayout'
import YourTest from './UserPage/YourTestPage/YourTest'
import UploadSection from './UserPage/UploadPage/UploadSection'
import Stats from './UserPage/StatsPage/Stats'
import ViewFlashCards from './UserPage/ViewFlashCardsPage/ViewFlashCards'
import TimeLine from './UserPage/TimeLinePage/TimeLine'
import LLMChat from './UserPage/LLMChatPage/LLMChat'


const router = createBrowserRouter([
  {
    path:"/",
    Component: LandingPageLayout,
  },
  {
    path:"signup",
    Component: SignUp,
  },
  {
    path:"login",
    Component: Login,
  },
  {
    path:"forgotpassword",
    Component: ForgotPassword,
  },
  {
    path: "userDashboard",
    Component: UserPageLayout,
    children: [
      {
        index: true,
        element: <Navigate to="upload" replace />
      },
      {
        path: "upload",
        Component: UploadSection
      },
      {
        path: "your-tests",
        Component: YourTest,
      },
      {
        path: "stats",
        Component: Stats
      },
      {
        path: "flashcards",
        Component: ViewFlashCards
      },
      {
        path: "timeline",
        Component: TimeLine
      },
      {
        path: "chat",
        Component:LLMChat
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode> 
)
