import { useState, useEffect } from 'react'
import { useNavigate, Navigate, useLocation, Link } from "react-router-dom"

// services
import { login } from '../../services/authentication'

// redux
import { useDispatch, useSelector } from "react-redux"
import { getUser } from '../../redux/actions/userActions'


const Login = (props) => {
  const userData = useSelector((state) => state.userReducer)
  let navigate = useNavigate()
  let location = useLocation()
  // we retrieve the url to get thanx to the props given by ProtectedRoutes.js
  let targetedUrl = location.state
  let dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // const notAllowedUlrsIfUserIsLogged = [
  //   '/',
  //   '/connection/register',
  //   '/connection/login'
  // ]

  console.log("Location", location)
  console.log('props login : ', props)
  console.log('targeted url in login 1 : ', targetedUrl)
  // we control if we want the user will be redirect to the next url when he is logged
  // if (!targetedUrl ) {
  //   targetedUrl = '/user/home'
  // } 
  console.log('targeted url in login  2: ', targetedUrl)

  const handleLogin = async (e) => {
    e.preventDefault()

    const emailError = document.querySelector('.email.error')
    const passwordError = document.querySelector('.password.error')

    await login({ email: email, password: password })
      .then(user => {
        console.log("user response =>", user)
        if (user.error) {
          emailError.innerHTML = ''
          passwordError.innerHTML = ''
          if (user.error.code === "email") {
            emailError.innerHTML = user.error.message
          } else if (user.error.code === "password") {
            passwordError.innerHTML = user.error.message
          } 
        } else {
          console.log("user logged! =>", user.data)
          console.log('targeted url in login when navigate : ', targetedUrl)
          window.localStorage.setItem("P'ti blog", user.data.token)
          dispatch(getUser(user.data.user))
        }
      })
  }

  useEffect(() => {
    if(userData.user.isLogged) {
      return navigate(targetedUrl)
    }
  }, [userData.user.isLogged, targetedUrl])

  return (
    <div className='login-component'>
      <h2>Connectez-vous</h2>
      <form action="" onSubmit={handleLogin} id="sign-in-form">
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          name="email" 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <div className="email error"></div>
        <br />
        <label htmlFor="password">Mot de passe</label>
        <input 
          type="password" 
          name="password" 
          id="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          />
        <div className="password error"></div>
        <br />

        <input type="submit" value="Valider" />
      </form>
      <Link to='/connection/register'>S'enregistrer</Link>
    </div>
    
  )
}

export default Login