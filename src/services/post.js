import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URL


export const getNoLoggedHomePosts = async () => {
  try {
    const posts = await axios({
      method:'get',
      url: `${baseUrl}/post/last-posts`,
    })
    return posts
  } catch (error) {
    console.log("Err message =>", error.response.data)
    return {error: error.response.data}
  }
}

export const getLoggedHomePosts = async (token, userId) => {
  try {
    const posts = await axios({
      method:'get',
      url: `${baseUrl}/user-friends/get-all-friends-posts/${userId}`,
      headers: {
        'x-access-token': token
      }
    })
    return posts
  } catch (error) {
    console.log("Err message =>", error.response.data)
    return {error: error.response.data}
  }
}

export const getPostsByUser = async (token, userId) => {
  try {
    const posts = await axios({
      method:'get',
      url: `${baseUrl}/post/posts-by-user/${userId}`,
      headers: {
        'x-access-token': token
      }
    })
    return posts
  } catch (error) {
    console.log("Err message =>", error.response.data)
    return {error: error.response.data}
  }
}

export const getAllFriendsByUser = async (token, userId) => {
  try {
    const posts = await axios({
      method:'get',
      url: `${baseUrl}/user-friends/get-all-friends-by-user/${userId}`,
      headers: {
        'x-access-token': token
      }
    })
    return posts
  } catch (error) {
    console.log("Err message =>", error.response.data)
    return {error: error.response.data}
  }
}