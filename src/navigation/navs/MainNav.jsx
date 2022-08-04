import './mainNav.scss'
import { NavLink, useLocation } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import Logout from '../../components/connection/Logout'
import meetingImg from '../../images/meeting.png'
import defaultUserImg from '../../images/default-user.png'

// redux
import { useSelector } from 'react-redux'


const MainNav = () => {
  const userData = useSelector((state) => state?.userReducer),
    userName = userData.user.infos?.name,
    isMobile = useMediaQuery({ query: '(max-width: 650px)' }),
    location = useLocation() 
    
  console.log("isconnected & mobile device =>", userData.user.isLogged, isMobile) 
  console.log("location =>", location)
  return (
    <header> 
      {/* FOR MOBILE WHEN USER ISN'T LOGGED IN */}
      {!userData.user.isLogged && isMobile &&
        <nav>
          <div className="logo-part">
            <NavLink to={'/'}>
              <img src={meetingImg} alt="logo-img" />
            </NavLink>
          </div>

          <h3>
            Hello mon pt'i
          </h3>
          
          <div className="right-arrow-block">
            <NavLink to={'/'} className={`${location.pathname === '/' ? 'display-none' : 'nav_right-arrow nav-icon'}`}>
              <FontAwesomeIcon 
                  icon='arrow-right'
              />
            </NavLink>
          </div>
          
        </nav>
      } 

      {/* FOR TABLETS AND DESKTOPS WHEN USER ISN'T LOGGED IN */}
      {!userData.user.isLogged && !isMobile &&
        <nav>
          <NavLink to={'/'}>
            <img src={meetingImg} alt="logo-img" />
          </NavLink>
          <h3>
            Hello mon pt'i
          </h3>
          
          <NavLink to={'/'} className={`${location === '/' ? 'display-none' : 'nav_right-arrow'}`}>
            <FontAwesomeIcon 
                icon='arrow-right' 
            />
          </NavLink>
        </nav>
      } 

    {/* FOR MOBILE WHEN USER IS LOGGED IN */}
    {userData.user.isLogged && isMobile &&  
      <nav className="main-navigation">
        <div className='left-part logo-part'>
          <NavLink to={'/user/home'}> 
            <img src={meetingImg} alt="logo-img" />
          </NavLink>
        </div>

        <div className="middle-part">
          <div className="user-img">
            {userData.user.infos?.image ?  (
              <NavLink 
                to={`/user/profile/${userName}`}
                className={({ isActive }) =>
                  isActive ? 'active-nav-profile-link' : 'not-active-nav-profile-link'
                }
              >
                <img src={'http://localhost:8000/uploads/profile/' + userData.user.infos?.image} alt="user-pic" />
              </NavLink> 
            ) : (
              <NavLink 
                to={`/user/profile/${userName}`}
                className={({ isActive }) =>
                isActive ? 'active-nav-profile-link' : 'not-active-nav-profile-link'
              }
              >
                <img src={defaultUserImg} alt="default-user-pic" />
              </NavLink>
            )}
            <p>{ userData.user.infos?.name } </p>
          </div> 
        </div>

        <div className="right-part">
          <nav className="nav-right">
            <div className="hamburger">
                <div className="line line1"></div>
                <div className="line line2"></div>
                <div className="line line3"></div>
            </div>
            <ul className="nav-right-links">
                <li>
                  <FontAwesomeIcon 
                    className='fa-icon'
                    icon='comment-dots'/>
                </li>
                <li>
                  <FontAwesomeIcon 
                    className='fa-icon' 
                    icon='bell'/>
                </li>
                <li>
                  <NavLink 
                    to={'/user/friends'}
                      className={({ isActive }) =>
                        isActive ? 'active-nav-link' : 'not-active-nav-link'
                    }
                  >
                    <FontAwesomeIcon 
                      icon='user-group'
                    />
                  </NavLink>
                </li>
                <li>
                  <Logout />
                </li>
            </ul>
          </nav>
          
        </div>
      </nav>
      }

      {/* FOR TABLETS AND DESKTOPS WHEN USER IS LOGGED IN */}
      {userData.user.isLogged && !isMobile && 
        <nav className="main-navigation">
          <div className='left-part'>
            <NavLink to={'/user/home'}> 
              <img src={meetingImg} alt="logo-img" />
            </NavLink>
          </div>

          <div className="middle-part">
            <NavLink 
              to={'/user/home'}
              className={({ isActive }) =>
                isActive ? 'active-nav-link' : 'not-active-nav-link'
              }
            >
              <FontAwesomeIcon 
                icon='house'
              />
            </NavLink>
            <NavLink 
              to={'/user/friends'}
              className={({ isActive }) =>
                isActive ? 'active-nav-link' : 'not-active-nav-link'
              }
            >
            <FontAwesomeIcon 
              icon='user-group'
            />
            </NavLink>
          </div>

          <div className="user-img">
              {userData.user.infos?.image ?  (
                <NavLink 
                  to={`/user/profile/${userName}`}
                  className={({ isActive }) =>
                    isActive ? 'active-nav-profile-link' : 'not-active-nav-profile-link'
                  }
                >
                  <img src={'http://localhost:8000/uploads/profile/' + userData.user.infos?.image} alt="user-pic" />
                </NavLink> 
              ) : (
                <NavLink 
                  to={`/user/profile/${userName}`}
                  className={({ isActive }) =>
                    isActive ? 'active-nav-profile-link' : 'not-active-nav-profile-link'
                  }
                >
                  <img src={defaultUserImg} alt="default-user-pic" />
                </NavLink>
              )}
            <p>{ userData.user.infos?.name } </p>
          </div>
          <div className="right-part">
            <FontAwesomeIcon 
              className='fa-icon'
              icon='comment-dots' 
            />
            <FontAwesomeIcon 
              className='fa-icon'
              icon='bell' 
            />
            <Logout />
          </div>
        </nav>
      }
    </header>
  )
}

export default MainNav
