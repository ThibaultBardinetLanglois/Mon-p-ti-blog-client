import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom" 

import Home from '../../pages/noLogged-user/Home'
import Login from '../../components/connection/Login'
import Register  from '../../components/connection/Register'
import NotFound from  '../../pages/notFound/NotFound'
import LoggedUserHome from "../../pages/loggued-user/home/LoggedUserHome"
import UserFriends from "../../pages/loggued-user/friendsResearch/UserFriendsResearch"
import Profile from '../../pages/profile/Profile' 
import ProfileAbout from "../../pages/profile/about/ProfileAbout"
import ProfileFriends from "../../pages/profile/friends/ProfileFriends"

import MainNav from '../navs/MainNav'
import ProtectedRoutes from "../../utilities/ProtectedRoutes"

// redux
import { useSelector } from 'react-redux'


const Index = () => {
  const userData = useSelector((state) => state.userReducer.user)
  console.log("USER ROUTER =>", userData)
  return (
    <BrowserRouter>
      <MainNav />
      <Routes>
        {/* For the routes whose don't need to be logged we don't want that a connected user can access it, so we need to pass the next url in props to redirect to this previous url */}
        <Route element={<ProtectedRoutes props={{path: window.location.pathname, needToBeLogged: false}} />}> 
          <Route path='/' element={<Home />} />
          <Route path="/connection/login" element={<Login />} />
          <Route path="/connection/register" element={<Register />} />
          <Route path='*' element={<NotFound />} />
        </Route>

        <Route element={<ProtectedRoutes props={{ path: window.location.pathname, needToBeLogged: true }} />}>
          <Route path='/user/home' element={<LoggedUserHome />} />
          <Route path='/user/profile/:name' element={<Profile />} />
          <Route path='/user/friends' element={<UserFriends />} />

          <Route path='/user/profile/:name' element={<Profile />} >
            <Route path='/user/profile/:name/about' element={<ProfileAbout />} />
            <Route path='/user/profile/:name/friends' element={<ProfileFriends />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default Index
