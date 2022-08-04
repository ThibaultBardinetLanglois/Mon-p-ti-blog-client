import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import { getLoggedHomePosts } from '../../../services/post'
import { getAllUsersForGeneralResearch } from '../../../services/user'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// redux
import { useSelector, useDispatch } from "react-redux"


const LoggedUserHome = () => {
  const [posts, setPosts] = useState(null)
  const [allUsers, setAllUsers] = useState(null)
  const [sortedUsers, setSortedUsers] = useState([])
  //`/user/profile/${userName}`
  const [usersSearch, setUsersSearch] = useState('')
  const token = window.localStorage.getItem("P'ti blog")
  const userData = useSelector((state) => state.userReducer.user)
  const loggedUserId = userData.infos.id
  
  const getFriendsPosts = async () => {
    try {
      const response = await getLoggedHomePosts(token, loggedUserId)
      setPosts(response.data)

    } catch(err) {
      console.log("Err =>", err)
    }
  }

  const getAllUsersForSearch = async () => {
    try {
      const response = await getAllUsersForGeneralResearch(token, loggedUserId)
      setAllUsers(response.data)
      setSortedUsers(response.data)
    } catch(err) {
      console.log("Error =>", err)
    }
  }

  useEffect(() => {
    getFriendsPosts()
    getAllUsersForSearch()
  }, [])

  useEffect(() => {
    if (!allUsers?.length) return

    let sortedUsers = allUsers.filter(user => 
      user.name.toLowerCase().includes(usersSearch.toLowerCase())
    )
    

    setSortedUsers(sortedUsers)
  }, [usersSearch])

  return (
    <div className='home-logged-user-container'>
      <div className="left-container">
        <div className="users-search-container">
          <label htmlFor="users-search">
          <FontAwesomeIcon 
            icon='magnifying-glass' 
          />
          </label>
          <input 
            type="text" 
            name="users-search" 
            id="users-search" 
            placeholder='Rechercher'
            value={usersSearch} 
            onChange={(e) => setUsersSearch(e.target.value)} 
          />
        </div>

        <div className="users-block">
          {sortedUsers &&
            sortedUsers.map((user, index) => {
              return (
                <div className="users-item" key={index}>
                  <Link to={`/user/profile/${user.name}`}>
                    <p>{ user.name }</p>
                  </Link>

                </div>
              )
            })
          }
        </div>
        
        <div className="filters-container">
          <FontAwesomeIcon icon="fa-solid fa-arrow-down-short-wide" />
        </div>
        
      </div>

      <div className="middle-container friend-posts-container">
        Friends posts
      </div>

      .right-container <div className="connected-friends-container">
        connected friends
      </div>
      
    </div>
  )
}

export default LoggedUserHome
