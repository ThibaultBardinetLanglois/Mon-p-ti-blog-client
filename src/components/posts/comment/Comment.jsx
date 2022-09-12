import './comment.scss'

import { useLocation } from 'react-router-dom'

// redux
import { useDispatch, useSelector } from 'react-redux'

// imgs
import defaultUserImg from '../../../images/default-user.png'

const Comment = (props) => {
  //console.log("props in comment : ", props)
  const comment = props.props.comment,
  commentCreatedAt = comment.created_at,
  senderProfileImg = comment.senderInfos?.profileImg,
  senderName = Array.isArray(comment.senderInfos) ? comment.senderInfos[0].name : comment.senderInfos.name,
  commentContent = comment.comment,
  userData = useSelector((state) => state.userReducer.user),
  loggedUserId = userData.infos.id,
  location = useLocation(),
  canEditComment = location.pathname !== "/" && loggedUserId === comment.user_id;

  // console.log("Comment in post : ", comment)
  // console.log("user data in comment :", userData)
  // console.log("location :", location)
  // console.log("can edit comment :", canEditComment)
  // console.log('sender name, date, comment :', senderName, commentCreatedAt, commentContent)
  return (
    <div>
      {canEditComment &&
        <button>Edit the comment</button>
      }
      <p> { senderName } </p>
      <p> { commentCreatedAt } </p>
      <p> { commentContent } </p>
    </div>
  )
}

export default Comment