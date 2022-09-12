import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URL

export const getRelationIfItExist = async (token, userId, potentialFriendId) => {
  try {
    const relation = await axios({
      method:'get',
      url: `${baseUrl}/user-friends/get-relation-if-it-exists/${userId}/${potentialFriendId}`,
      headers: {
        'x-access-token': token
      }
    })
    return relation
  } catch (error) {
    console.log("Err message =>", error.response.data)
    return {error: error.response.data}
  }
}

export const getAllFriendsByUser = async (token, userId) => {
  try {
    const recommandations = await axios({
      method:'get',
      url: `${baseUrl}/user-friends/get-all-friends-by-user/${userId}`,
      headers: {
        'x-access-token': token
      }
    })
    return recommandations
  } catch (error) {
    console.log("Err message =>", error.response.data)
    return {error: error.response.data}
  }
}

export const getAllFriendsRecommandationsByUser = async (token, userId) => {
  try {
    const recommandations = await axios({
      method:'get',
      url: `${baseUrl}/user-friends/get-all-friends-recommandations-by-user/${userId}`,
      headers: {
        'x-access-token': token
      }
    })
    return recommandations
  } catch (error) {
    console.log("Err message =>", error.response.data)
    return {error: error.response.data}
  }
}

export const sendInvitation = async (token, userId, friendId) => {
  try {
    const recommandations = await axios({
      method:'get',
      url: `${baseUrl}/user-friends/propose-to-be-friend`,
      headers: {
        'x-access-token': token
      },
      data: {
        userId: userId,
        friendId: friendId
      }
    })
    return recommandations
  } catch (error) {
    console.log("Err message =>", error.response.data)
    return {error: error.response.data}
  }
}