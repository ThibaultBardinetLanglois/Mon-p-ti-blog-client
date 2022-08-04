import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URL


export const getUserByName = async (userName, token) => {
  try {
    const user = await axios({
      method:'get',
      url: `${baseUrl}/user/${userName}`,
      headers: { 
        'x-access-token': token
      },
      params: { name: userName }
    })
    return user
  } catch (error) {
    console.log("Err message =>", error.response.data)
    return {error: error.response.data}
  }
}


export const editUser = async (data, token, csrfToken) => {
    console.log("Data axios =>", data)
    try {
      const response = await axios({
        method:'put',
        url: `${baseUrl}/user/edit`,
        headers: { 
          'x-access-token': token,
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'xsrf-token': csrfToken
        },
        data: data 
      })
      return response
    } catch (error) {
      console.log("Err message =>", error.response.data)
      return {error: error.response.data}
    }
}

export const getAllUsersForGeneralResearch = async (token, userId) => {
  try {
    const response = await axios({
      method:'get',
      url: `${baseUrl}/user/get-all-for-research/${userId}`,
      headers: { 
        'x-access-token': token
      }
    })
    return response
  } catch (error) {
    console.log("Err message =>", error.response.data)
    return {error: error.response.data}
  }
}

