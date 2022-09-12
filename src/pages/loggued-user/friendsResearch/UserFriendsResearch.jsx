import { useState, useEffect } from "react"

import { getAllFriendsRecommandationsByUser } from "../../../services/friends"

const UserFriends = () => {
  const [friendsRecommendations, setFriendsRecommendations] = useState([])

  return (
    <div>
      user friends here!!
    </div>
  )
}

export default UserFriends
