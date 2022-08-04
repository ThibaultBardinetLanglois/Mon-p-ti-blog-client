import './comment.scss'

// redux
import { useDispatch, useSelector } from 'react-redux'

// imgs
import defaultUserImg from '../../../../images/default-user.png'

const Comment = (props) => {
  console.log("Comment in post : ", props.props)
  const comment = props.props.comment,
    commentCreatedAt = props.props.created_at,
    senderProfileImg = props.props.senderInfos.profileImg,
    senderName = props.props.senderInfos.name,
    userData = useSelector((state) => state.userReducer.user),
    loggedUserId = userData.infos.id,
    canEditComment = loggedUserId === comment.user_id;
  return (
    <div>
      {canEditComment &&
        <button>Edit the comment</button>
      }
      
      <p> { senderName } </p>
      <p> { commentCreatedAt } </p>
      <p> { comment } </p>
      <br/>
    </div>
  )
}

export default Comment