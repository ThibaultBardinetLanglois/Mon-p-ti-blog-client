// redux
import { useDispatch, useSelector } from "react-redux"
import { logout } from '../../redux/actions/userActions'

import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" 

const Logout = () => {
    let navigate = useNavigate()
    const user = useSelector((state) => state.userReducer.user)
    let dispatch = useDispatch();

    const deleteSession = () => {
        if(user.isLogged && localStorage.getItem('P\'ti blog').length) {
            localStorage.removeItem('P\'ti blog')
            dispatch(logout())
            return navigate('/')
        }
    }

    return (
        <FontAwesomeIcon 
            className="logout-icon"
            onClick={deleteSession}
            icon='door-open' 
        />
    )
}

export default Logout