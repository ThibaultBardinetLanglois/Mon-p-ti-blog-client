import './post.scss'

// Components
import Comment from '../comment/Comment'

// Fontawsome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// redux
import { useDispatch, useSelector } from 'react-redux'

// imgs
import defaultUserImg from '../../../images/default-user.png'

const Post = (props) => {
  const post = props.props.post,
    senderUser = props.props.user,
    userData = useSelector((state) => state.userReducer.user),
    loggedUserId = userData.infos.id,
    canEditPost = loggedUserId === post.user_id;

  // console.log("post props : ", props)
  // console.log("post : ", post);
  return (
    <div className='post-container'>
      <p>POST</p>
      {canEditPost &&
        <button>Edit The Post</button>
      }
      <p> { senderUser.name } </p>
      <p> { post.tag.toUpperCase() } </p>
      <p> {post.created_at} </p>
      <p> {post.title} </p>
      <p> {post.description} </p>
      <div className="post-likes-comments-container">
        <div className="likes-number-block">
          <FontAwesomeIcon 
              icon='thumbs-up'
          />
          {post.likes.length > 0 &&
            <p>{post.likes.length} {post.likes.length > 1 ? "likes" : "like"} </p>
          }
        </div>
        <div className="comments-number-block">
          <FontAwesomeIcon 
            icon='message'
          />
          {post.likes.length > 0 &&
            <p>{post.comments.length} {post.comments.length > 1 ? "commentaires" : "commentaire"} </p>
          }
        </div>
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
  )
}

export default Post
