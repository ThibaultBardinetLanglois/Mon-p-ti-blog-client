import './home.scss'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// api request
import { getNoLoggedHomePosts } from '../../services/post'

// Components
import PostHome from '../../components/posts/post-home/PostHome'

const Home = () => {
  const [posts, setPosts] = useState(null)
  
  const getPosts = async () => {
    try {
      const res = await getNoLoggedHomePosts()
      setPosts(res.data)

    } catch(err) {
      console.log("Err =>", err)
    }
  }

  useEffect(() => {
    getPosts()
    console.log("posts =>", posts)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="links-block">
        <div className="sign-up-link">
          <Link to={'/connection/register'}>
            <FontAwesomeIcon 
              icon='user-plus' 
            />
          </Link>
        </div>
        <div className="sign-in-link">
        <Link to={'/connection/login'}>
          <FontAwesomeIcon 
            icon='right-to-bracket' 
          />
        </Link>
        </div>
      </div>
      <div className="no-logged-home-posts-container">
        {posts ?
          (
            posts.map((post, index) => {
              return <PostHome props={{ post }} key={index} />
            })
          ) : (
            <p>Il n'y a encore aucun post publiés</p>
          )
        }
      </div>
    </div>
  )
}

export default Home
