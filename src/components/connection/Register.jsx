import { useState } from 'react'
import { useNavigate, Link } from "react-router-dom"

import { register } from '../../services/authentication'

// redux
import { useDispatch } from "react-redux"
import { getUser } from '../../redux/actions/userActions'

const Register = () => {
  let dispatch = useDispatch()
  let navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    console.log(`name => ${name}, email => ${email}, password => ${password}`)

    const nameError = document.querySelector('.name.error')
    const emailError = document.querySelector('.email.error')
    const passwordError = document.querySelector('.password.error')

    await register({name: name, email: email, password: password})
      .then(user => {
        console.log("user response =>", user)
        if (user.error) {
          nameError.innerHTML = ''
          emailError.innerHTML = ''
          passwordError.innerHTML = ''
          if (user.error.code === "name") {
            nameError.innerHTML = user.error.message
          } else if (user.error.code === "email") {
            emailError.innerHTML = user.error.message
          } else if (user.error.code === "password") {
            passwordError.innerHTML = user.error.message
          }  
        } else {
          window.localStorage.setItem("P'ti blog", user.data.token)
          dispatch(getUser(user.data.user));
          return navigate('/user/home')

        }
      })
  }

  return (
    <div className='register-component'>
      <h2>Enregistrez-vous</h2>
      <form action="" onSubmit={handleRegister} id="sign-up-form">
        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          name="name" 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          />
        <div className="name error"></div>
        <br />
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
        <input type="submit" value="Valider inscription" />
      </form>
      <Link to='/connection/login'>Se connecter</Link>
    </div>
    
  )
}

export  default Register
