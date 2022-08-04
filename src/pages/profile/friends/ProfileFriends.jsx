import { useState, useEffect } from 'react'
import { useParams, useOutletContext } from 'react-router-dom';

// services
import { retrieveCsrfToken } from '../../../services/authentication'
import { editUser, getUserByName } from '../../../services/user'

const ProfileFriends = () => {
  return (
    <div>
      user friends here!!
    </div>
  )
}

export default ProfileFriends
