import { useState, useEffect } from 'react'
import { Link, Outlet, useLocation, useParams } from "react-router-dom"

import ProfilePublications from "../../pages/profile/publications/ProfilePublications"

import { getUserByName } from '../../services/user'
import { getRelationIfItExist } from '../../services/friends'

// redux
import { useSelector } from 'react-redux'


// We have to determine if it is the profile page of the user who is connected or the profile page of a particular user the logged in user wants to look at
// So We determine if the name passed in the url is the same as in the redux store, if yes the profile page we are on is the logged in user and he has more permissions and rights, if not it corresponds to a non-logged-in user
const Profile = () => {
  const location = useLocation(),
    [userInUrl, setUserInUrl] = useState(null),
    userData = useSelector((state) => state.userReducer),
    urlName  = useParams().name,
    token = window.localStorage.getItem("P'ti blog"),
    userName = userData.user.infos?.name === urlName ? userData.user.infos?.name : urlName,
    isPotentialFriend = userName !== userData.user.infos?.name ? true : false,
    [relation, setRelation] = useState({});

  console.log("name in url:", urlName)
  console.log("name url === redux name :", userData.user.infos?.name === urlName)
  console.log("username : ", userName)
  console.log("is potential friend : ", isPotentialFriend)

  const getUserInUrl = async () => {
    try {
      const response = await getUserByName(userName, token)
      setUserInUrl(response.data)
    } catch(err) {
      console.log("Error =>", err)
    }
  }

  const getRelationWithUserInUrl = async () => {
    try {
      const response = await getRelationIfItExist(token, userData.user.infos?.id, userInUrl.id)
      setRelation(response.data.relation)
    } catch(error) {
      console.log("Error : ", error)
    }
  }

  useEffect(() => {
    getUserInUrl()
  }, [urlName])

  useEffect(() => {
    if (isPotentialFriend) {
      getRelationWithUserInUrl()
    }
  }, [userInUrl])

  //We pass the correct userName in the url and the userData by using the context of the Outlet
  return (
    <div>
      <h2>Profile de { userName }</h2>
      { isPotentialFriend && relation && relation?.status === `active` &&
        <div className="relation-action-block">
          <p> Vous êtes ami avec {userInUrl.name} </p>
          <button>Retirer des amis</button>
        </div>
      }
      { isPotentialFriend && relation && relation?.status === `pending` &&
        <div className="relation-action-block">
          <p> L'invitation est toujours en attente </p>
          <button>Supprimer l'invitation</button>
        </div>
      }
      { console.log('relation =>', relation)}
      { isPotentialFriend && !relation && 
        <div className="relation-action-block">
          <button>Envoyer une invitation</button>
        </div>
      }
    {console.log('user in url :', userInUrl)}
      <nav>
        <Link to={`/user/profile/${userName}`}>Publications</Link>
        <Link to={`/user/profile/${userName}/about`}>À propos</Link>
        <Link to={`/user/profile/${userName}/friends`}>Amis</Link>
      </nav>
      {location.pathname === `/user/profile/${userName}` ? (
        // I pass user in props by a manner to anticipate props could contains more object (e.g: userInUlr, posts, otherFriends)
        <ProfilePublications />
      ) : (
        <Outlet /> 
      )}
    </div> 
  )
}

export default Profile
