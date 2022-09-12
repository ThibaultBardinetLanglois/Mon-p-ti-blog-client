import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

// services
import { getUserByName } from '../../../services/user'
import { getPostsByUser } from '../../../services/post'

// redux
import { useSelector } from 'react-redux'

// Component
import Post from '../../../components/posts/post-profile/Post';


const ProfilePublications = () => {
  const [userInUrl, setUserInUrl] = useState(null),
    [userPosts, setUserPosts] = useState(null),
    userData = useSelector((state) => state.userReducer),
    urlName  = useParams().name,
    token = window.localStorage.getItem("P'ti blog"),
    userName = userData.user.infos?.name === urlName ? userData.user.infos?.name : urlName

  console.log("name in url:", urlName)
  console.log("name url === redux name :", userData.user.infos?.name === urlName)
  console.log("username : ", userName)

  const getUserInUrl = async () => {
    try {
      const response = await getUserByName(urlName, token)
      setUserInUrl(response.data)
    } catch(err) {
      console.log("Error =>", err)
    }
  }

  const getUserPosts = async () => {
    const token = window.localStorage.getItem("P'ti blog")

    await getPostsByUser(token, userInUrl?.id)
      .then(posts => {
        setUserPosts(posts.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    getUserInUrl()
    console.log('user in url =>', userInUrl);
  }, [userName])

  useEffect(() => {
    getUserPosts()
  }, [userInUrl])

  return (
    <div>
      profil publications here!!
      {console.log('user posts :', userPosts)}
      {userPosts && userPosts?.length ? (
          userPosts.map((post, index) => {
            return <Post key={index} props={{post, user: userInUrl}}/>
          })
        ) : (
          <p> {userPosts?.message} </p>
        )
      }
    </div>
  )
}

export default ProfilePublications
