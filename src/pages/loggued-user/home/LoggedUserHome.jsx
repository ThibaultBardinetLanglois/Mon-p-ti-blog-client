import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import { getLoggedHomePosts } from '../../../services/post'
import { getAllUsersForGeneralResearch } from '../../../services/user'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// redux
import { useSelector, useDispatch } from "react-redux"

// Components
import PostHome from '../../../components/posts/post-home/PostHome'


const LoggedUserHome = () => {
  const [posts, setPosts] = useState(null)
  const [filteredPosts, setFilteredPosts] = useState([])
  const [allUsers, setAllUsers] = useState(null)
  const [sortedUsers, setSortedUsers] = useState([])
  const [usersSearch, setUsersSearch] = useState('')
  const token = window.localStorage.getItem("P'ti blog")
  const userData = useSelector((state) => state.userReducer.user)
  const loggedUserId = userData.infos.id

  // Checkbox filter states
  const [sortByAnimals, setSortByAnimals] = useState(false),
  [sortByArt, setSortByArt] = useState(false),
  [sortByCooking, setSortByCooking] = useState(false),
  [sortByVarious, setSortByVarious] = useState(false),
  [sortByEcology, setSortByEcology] = useState(false),
  [sortByCompany, setSortByCompany] = useState(false),
  [sortByComputerScience, setSortByComputerScience] = useState(false),
  [sortByNature, setSortByNature] = useState(false),
  [sortByPlants, setSortByPlants] = useState(false),
  [sortByPolitics, setSortByPolitics] = useState(false),
  [sortByScience, setSortByScience] = useState(false),
  [sortBySport, setSortBySport] = useState(false),
  [sortByCity, setSortByCity] = useState(false);

  
  const getFriendsPosts = async () => {
    try {
      const response = await getLoggedHomePosts(token, loggedUserId)
      //console.log("response data post friends =>", response.data.posts)
      setPosts(response.data.posts)
      setFilteredPosts(response.data.posts)
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
    //console.log("post logged home =>", posts)
  }, [])

  useEffect(() => {
    if (!allUsers?.length) return

    let sortedUsers = allUsers.filter(user => 
      user.name.toLowerCase().includes(usersSearch.toLowerCase())
    )
    setSortedUsers(sortedUsers)

    let sortedPosts = posts
    let selectedFilters = []
    if(sortByAnimals) selectedFilters.push("Animaux")
    if(sortByArt) selectedFilters.push("Art")
    if(sortByCooking) selectedFilters.push("Cusine")
    if(sortByVarious) selectedFilters.push("Divers")
    if(sortByEcology) selectedFilters.push("Ecologie")
    if(sortByCompany) selectedFilters.push("Entreprise")
    if(sortByComputerScience) selectedFilters.push("Informatique")
    if(sortByNature) selectedFilters.push("Nature")
    if(sortByPlants) selectedFilters.push("Plantes")
    if(sortByPolitics) selectedFilters.push("Politique")
    if(sortByScience) selectedFilters.push("Science")
    if(sortBySport) selectedFilters.push("Sport")
    if(sortByCity) selectedFilters.push("Ville")

    if(selectedFilters.length) {
      sortedPosts = sortedPosts.filter(post => selectedFilters.includes(post.post_tag))
    }
    setFilteredPosts(sortedPosts)
  }, [usersSearch, sortByAnimals, sortByArt, sortByCooking, sortByVarious, sortByEcology, sortByCompany,sortByComputerScience, sortByNature, sortByPlants, sortByPolitics, sortByScience, sortBySport, sortByCity])

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
          <div className="filters-checkbox">
            <label id="checkbox-block">
              Animaux
              <input 
                type="checkbox" 
                checked={sortByAnimals} 
                onChange={() => setSortByAnimals(!sortByAnimals)}
              />
            </label>
            <label id="checkbox-block">
              Art
              <input 
                type="checkbox" 
                checked={sortByArt} 
                onChange={() => setSortByArt(!sortByArt)}
              />
            </label>
            <label id="checkbox-block">
              Cuisine
              <input 
                type="checkbox" 
                checked={sortByCooking} 
                onChange={() => setSortByCooking(!sortByCooking)}
              />
            </label>
            <label id="checkbox-block">
              Divers
              <input 
                type="checkbox" 
                checked={sortByVarious} 
                onChange={() => setSortByVarious(!sortByVarious)}
              />
            </label>
            <label id="checkbox-block">
              Écologie
              <input 
                type="checkbox" 
                checked={sortByEcology} 
                onChange={() => setSortByEcology(!sortByEcology)}
              />
            </label>
            <label id="checkbox-block">
              Entreprise
              <input 
                type="checkbox" 
                checked={sortByCompany} 
                onChange={() => setSortByCompany(!sortByCompany)}
              />
            </label>
            <label id="checkbox-block">
              Informatique
              <input 
                type="checkbox" 
                checked={sortByComputerScience} 
                onChange={() => setSortByComputerScience(!sortByComputerScience)}
              />
            </label>
            <label id="checkbox-block">
              Nature
              <input 
                type="checkbox" 
                checked={sortByNature} 
                onChange={() => setSortByNature(!sortByNature)}
              />
            </label>
            <label id="checkbox-block">
              Plantes
              <input 
                type="checkbox" 
                checked={sortByPlants} 
                onChange={() => setSortByPlants(!sortByPlants)}
              />
            </label>
            <label id="checkbox-block">
              Politique
              <input 
                type="checkbox" 
                checked={sortByPolitics} 
                onChange={() => setSortByPolitics(!sortByPolitics)}
              />
            </label>
            <label id="checkbox-block">
              Science
              <input 
                type="checkbox" 
                checked={sortByScience} 
                onChange={() => setSortByScience(!sortByScience)}
              />
            </label>
            <label id="checkbox-block">
              Sport
              <input 
                type="checkbox" 
                checked={sortBySport} 
                onChange={() => setSortBySport(!sortBySport)}
              />
            </label>
            <label id="checkbox-block">
              Ville
              <input 
                type="checkbox" 
                checked={sortByCity} 
                onChange={() => setSortByCity(!sortByCity)}
              />
            </label>
          </div>
        </div>
        
      </div>
          {/* {console.log("Posts in home : ", posts)} */}
      <div className="middle-container friend-posts-container">
        <h2>FRIENDS POSTS</h2>
        {filteredPosts &&
          filteredPosts.map((post, index) => {
            return <PostHome props={{ post }} key={index} />
          })
        }
      </div>

      <div className="right-container connected-friends-container">
        <h2>connected friends</h2>
        
      </div>
      
    </div>
  )
}

export default LoggedUserHome
