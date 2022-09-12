import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';

// services
import { retrieveCsrfToken } from '../../../services/authentication'
import { getUserByName } from '../../../services/user';
import { getAllFriendsByUser } from '../../../services/friends';

// redux
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../../redux/actions/userActions'

// imgs
import defaultUserImg from '../../../images/default-user.png'

const ProfileFriends = () => {
  const [user, setUser] = useState(),
    userData = useSelector((state) => state.userReducer.user),
    urlName  = useParams().name,
    token = window.localStorage.getItem("P'ti blog"),
    userName = userData.infos?.name === urlName ? userData.infos?.name : urlName,
    isAuthorizedToEdit = user?.id === userData.infos?.id ? true : false,
    idToSendInRequests = isAuthorizedToEdit ? userData.infos.id : user?.id,
    [friends, setFriends] = useState([]);

    console.log("user in context friend profile page :", user)
    console.log("user data in friend profile page :", userData)
    console.log("url name in friend profile page :", urlName)
    console.log("Is user authorized to edit and delete in friends profile page :", isAuthorizedToEdit)
    console.log("Id to send in requests :", idToSendInRequests)

  
  const getUser = async () => {
    try {
      const response = await getUserByName(userName, token)
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const retrieveFriendsByUser = async () => {
    try {
      const response = await getAllFriendsByUser(token, idToSendInRequests)
      setFriends(response.data)
    } catch(error) {
      console.log("Error : ", error)
    }
  }

  useEffect(() => {
    if (!isAuthorizedToEdit) {
      getUser()
    }

    if (idToSendInRequests) {
      retrieveFriendsByUser()
    }
  }, [idToSendInRequests])

  return (
    <div className="profile-friends-page">
      <div className='profile-friends-container'>
        {friends?.friendsCount &&
          <h2>Amis {friends.friendsCount}</h2>
        }
        {console.log("friends =>", friends)}
        {friends?.friendsCount > 0 &&
          friends.userFriends.map((friend, index) => {
            return (
              <div key={index} className="friend-block">
                <Link to={`/user/profile/${friend.user_name}`}>
                  <h3> { friend.user_name } </h3>
                </Link>
                {isAuthorizedToEdit && 
                  <button>Delete</button>
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default ProfileFriends
