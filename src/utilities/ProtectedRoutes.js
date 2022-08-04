import { useState, useEffect } from "react"
import { 
  Navigate,
  Outlet, 
  useLocation
} from "react-router-dom"

import { checkToken } from "../services/authentication"

// redux
import { useSelector, useDispatch } from "react-redux"
import { getUser, logout } from "../redux/actions/userActions"


const ProtectedRoutes = ({props}) => {
  const location = useLocation()
  console.log("props protected routes 👉️ =>", props)
  console.log('Protected routes location', location)
  let nextRoute = null

  location.state ? nextRoute = location.state : nextRoute = location.pathname
  

  const [token, setToken] = useState(window.localStorage.getItem("P'ti blog"))
  let dispatch = useDispatch()
  const userData = useSelector((state) => state.userReducer)

  
  useEffect(() => {
    if (token) {
      checkToken(token)
      .then(user => {
        console.log(user.data.decryptedToken)
        dispatch(getUser(user.data.decryptedToken))
        
      })
      .catch(err => {
        console.log(err)
        dispatch(logout())
      })
    }
    
    console.log('token in protected routes 👉️ : ', token);
    
  }, [token, dispatch])

  console.log("Protected routes props 👉️ =>", props)
  console.log("next route  👉️ =>", nextRoute)
  console.log(`USER DATA 👉️ =>`, userData.user)

  // case 1
  if (
      !props.needToBeLogged && 
      !userData.user.isLogged
  ) {
      console.log("user isn't logged and no need to be logged")
      return <Outlet />
  }   

  // case 2
  if (
    !props.needToBeLogged && 
    userData.user.isLogged
  ) {
      console.log("user is logged and no need to be logged")
      return <Navigate to='/user/home'/>
  }

  // case 3
  if (
    props.needToBeLogged === true &&
    userData.user.isLogged === true
  ) {
    console.log("user is logged and we need to be logged")
    return <Outlet />
  }

  // case 4
  if (
    props.needToBeLogged === true &&
    !userData.user.isLogged === true
  ) {
    console.log("user isn't logged and we need to be logged")
    return <Navigate to='/connection/login' state={nextRoute}/>
  }
}

export default ProtectedRoutes 