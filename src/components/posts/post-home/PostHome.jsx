import './homePost.scss'

// Components
import Comment from '../comment/Comment'

import { useLocation } from 'react-router-dom'

// Fontawsome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// redux
import { useDispatch, useSelector } from 'react-redux'

// imgs
import defaultUserImg from '../../../images/default-user.png'

const PostHome = (props) => {
  const post = props.props.post;

  const isUserLoggedIn = props.props.userHome ? true : false,
    userData = useSelector((state) => state.userReducer.user),
    loggedUserId =  isUserLoggedIn ? userData.infos.id : null,
    canEditPost = loggedUserId === post.user_id,
    location = useLocation();

  // console.log("post props : ", props)
  // console.log("post : ", post);
  // console.log("is user logged in ? =>", isUserLoggedIn);
  // console.log("user data :", userData);
  // console.log("logged user id : ",  loggedUserId);
  // console.log("Can edit home post : ", canEditPost);
  return (
    <>
      {location.pathname === '/user/home' ? (
        <div className='post-user-home-container'>
          <p>POST</p>
          {canEditPost &&
            <button>Edit The Post</button>
          }
          <p> { post.user_name } </p>
          <p> { post.post_tag.toUpperCase() } </p>
          <p> {post.post_created_at} </p>
          <p> {post.post_title} </p>
          <p> {post.description} </p>

          <div className="post-likes-comments-container">
              {post.likes.length > 0 &&
                <div className="likes-number-block">
                  <FontAwesomeIcon 
                    icon='thumbs-up'
                  />
                  <p>{post.likes.length} {post.likes.length > 1 ? "likes" : "like"} </p>
              </div>
              }
              {post.likes.length > 0 &&
                <div className="comments-number-block">
                  <FontAwesomeIcon 
                    icon='message'
                  />
                  <p>{post.comments.length} {post.comments.length > 1 ? "commentaires" : "commentaire"} </p>
                </div>
              }
            <div className="add-like-comments-block">
              <div className='add-like-block'>
                <FontAwesomeIcon 
                  icon='thumbs-up'
                />
                {post.likes.filter(like => like.user_id === userData.infos.id).length === 1 ? (
                    <p>Je n'aime plus</p>
                  )
                  : (
                    <p>J'aime</p>
                  )
                }
              </div>
              <div className="add-comment">
                <FontAwesomeIcon 
                  icon='message'
                />
                <p>Commenter</p>
              </div>
          </div>
        </div>
        <p>Comments</p>
        {post.comments.length > 0 &&
          post.comments.map((comment, index) => {
            return <Comment key={index} props={{ comment }} />
          })
        }
      </div>
        ) : (
          <div className='post-no-connected-home'>
            <p> { post.senderInfos.name } </p>
            <p> { post.tag.toUpperCase() } </p>
            <p> {post.created_at} </p>
            <p> {post.title} </p>
            <p> {post.description} </p>
            <div className="post-likes-comments-container">
              <div className="likes-number-block">
                <FontAwesomeIcon 
                  icon='thumbs-up'
                />
                {post.likes && post.likes.length > 0 &&
                  <p>{post.likes.length} {post.likes.length > 1 ? "likes" : "like"} </p>
                }
              </div>
              <div className="comments-number-block">
                <FontAwesomeIcon 
                  icon='message'
                />
                {post.comments && post.comments.length > 0 &&
                  <p>{post.comments.length} {post.comments.length > 1 ? "commentaires" : "commentaire"} </p>
                }
              </div>
              <div className="add-like-comments-block">
                <div className='add-like-block'>
                  <FontAwesomeIcon 
                    icon='thumbs-up'
                  />
                  {post.likes && post.likes.filter(like => like.user_id === userData.infos.id).length === 1 ? (
                      <p>Je n'aime plus</p>
                    )
                    : (
                      <p>J'aime</p>
                    )
                  }
                </div>
                <div className="add-comment">
                  <FontAwesomeIcon 
                    icon='message'
                  />
                  <p>Commenter</p>
                </div>
              </div>
            </div>
            <p>Comments</p>
            {post.comments && post.comments.length > 0 &&
              post.comments.map((comment, index) => {
                return <Comment key={index} props={{ comment }} />
              })
            }
          </div>
        )}
    </>
  )
}

export default PostHome