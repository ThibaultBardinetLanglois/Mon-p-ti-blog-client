import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URL

// register
export const register = async (user) => {
  let name = user.name,
    email = user.email,
    password = user.password
    console.log(user)

    try {
      const response = await axios({
        method:'post',
        url: `${baseUrl}/user/register`,
        data: {
          name,
          email,
          password
        }
      })
      return response
    } catch (error) {
      console.log("Err message =>", error.response.data)
      return {error: error.response.data}
    }
}

// login
export const login = async (credentials) => {
  const { email, password } = credentials
  try {
    const response = await axios({
      credentials: 'same-origin',
      method: 'post',
      url: `${baseUrl}/user/login`,
      data: {
        email,
        password
      }
    })
    return response
  } catch (error) {
    console.log("Err message =>", error.response.data)
    return {error: error.response.data}
  }
}

// checkToken
export const checkToken = async (token) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${baseUrl}/user/checkToken`,
      headers: {'x-access-token': token}
    })
    return response
  } catch (error) {
    console.log("Err message =>", error.response.data)
    return {error: error.response.data}
  }
}

// fetch csrfToken when the user arrive on a page wich have a form
export const retrieveCsrfToken = async (token) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${baseUrl}/csrf_security/get-new-csrf-token`,
      headers: { 
        'x-access-token': token
      },
    })
    return response
  } catch (error) {
    console.log("Cette authentification n'est pas valide")
    return {error: "Cette authentification n'est pas valide"}
  }
}
