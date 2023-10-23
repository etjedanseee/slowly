import { Navigate } from "react-router-dom"
import AuthPage from "../pages/AuthPage"
import AutoSearch from "../pages/AutoSearch"
import Draft from "../pages/Draft"
import FriendChatPage from "../pages/FriendChatPage"
import Friends from "../pages/Friends"
import Home from "../pages/Home"
import ManuallySearch from "../pages/ManuallySearch"
import OtherProfile from "../pages/OtherProfile"
import Profile from "../pages/Profile"
import ResetPassword from "../pages/ResetPassword"
import SearchFriends from "../pages/SearchFriends"
import Settings from "../pages/Settings"
import SignInPage from "../pages/SignInPage"
import SignUpPage from "../pages/SignUpPage"

interface IRoute {
  path: string,
  element: React.ReactNode
}

export const privateRoutes: IRoute[] = [
  { path: '/', element: <Home /> },
  { path: '/friends', element: <Friends /> },
  { path: '/friends/:id', element: <FriendChatPage /> },
  { path: '/search', element: <SearchFriends /> },
  { path: '/search/autoSearch', element: <AutoSearch /> },
  { path: '/search/manuallySearch', element: <ManuallySearch /> },
  { path: '/draft', element: <Draft /> },
  { path: '/profile', element: <Profile /> },
  { path: '/profile/settings', element: <Settings /> },
  { path: '/users/:id', element: <OtherProfile /> }
]

export const publicRoutes: IRoute[] = [
  { path: '/auth', element: <AuthPage /> },
  { path: '/auth/signUp', element: <SignUpPage /> },
  { path: '/auth/signIn', element: <SignInPage /> },
  { path: '/auth/resetPassword', element: <ResetPassword /> },
  { path: '*', element: <Navigate to={'/auth'} /> }
]