import { useState, useEffect } from 'react'
import { useParams, useOutletContext } from 'react-router-dom';

// services
import { retrieveCsrfToken } from '../../../services/authentication'
import { editUser, getUserByName } from '../../../services/user'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../../redux/actions/userActions'

// imgs
import defaultUserImg from '../../../images/default-user.png'

const ProfileAbout = (props) => {
  const [user, setUser] = useState(),
  dispatch = useDispatch(),
  userData = useSelector((state) => state.userReducer.user),
  token = window.localStorage.getItem("P'ti blog"),
  userId = userData.infos?.id,
  [csrfToken, setCsrfToken] = useState(''),
  urlName = useParams().name,
  userName = userData.infos?.name === urlName ? userData.infos?.name : urlName,
  [allowedToEdit] = useState(urlName === userData.infos?.name);
  console.log("user in url =>", user)
  
  console.log("Allowed to edit ==>", allowedToEdit);
  // Retrieve csrf token in the useEffect if allowedToEdit is set to true
  const getCsrfTokenFromServer = async () => {
    await retrieveCsrfToken(window.localStorage.getItem("P'ti blog"))
      .then(response => {
        setCsrfToken(response.data?.csrfToken)
      })
  }

  const getUser = async () => {
    try {
      const response = await getUserByName(userName, token)
      setUser(response.data)
      setName(response.data?.name)
      setEmail(response.data?.email)
      setDescription(response.data?.description)
      setPassions(response.data?.passions)
      setCreatedAt(response.data.created_at)
      setImage(response.data.image)
    } catch (error) {
      console.log(error)
    }
  }

  // We have to display either the user infos from the redux store if the user is connected and is on his profile page either the user infos from the user in url in case we just look a friend profile and don't have the permissions to edit it
  const [editForm, setEditForm] = useState(false)
  const [file, setFile] = useState(null)
  const [name, setName] = useState(userData.infos?.name)
  const [email, setEmail] = useState(userData.infos?.email)
  const [description, setDescription] = useState(userData.infos?.description)
  const [passions, setPassions] = useState(userData.infos?.passions)
  const [createdAt, setCreatedAt] = useState(userData.infos.created_at)
  const [image, setImage] = useState(userData.infos.image)

  console.log(`name : ${name}`, user?.name)
  
  const handleEdit = async (e) => {
    e.preventDefault()
    const userInfos = {
      id: userId,
      name: name,
      email: email,
      description: description,
      passions: passions
    }

    const token = window.localStorage.getItem("P'ti blog")
    
    const json = JSON.stringify(userInfos)
    const blob = new Blob([json], {
        type: 'application/json'
    })
    
    const data = new FormData() 
    data.append("imgProfile", file)
    data.append("userInfos", blob)
    console.log("data in edit user =>", data)
    await editUser(data, token, csrfToken)
      .then(response => {
        console.log(response)
        getUserByName(name, token)
          .then(user => {
            console.log(`USER ${name} found =>`, user)
            dispatch(getUser(user.data))
            setName(user.data?.name)
            setEmail(user.data?.email)
            setDescription(user.data?.description)
            setPassions(user.data?.passions)
            setImage(user.data?.image)
            setEditForm(false)
          })
          .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
  }

  const textAreaNotNull = () => {
    // to avoid the error "`value` prop on `textarea` should not be null"
    if(!description) {
      setDescription('')
    }
  
    if(!passions) {
      setPassions('')
    }
  }

  useEffect(() => {
    if (!allowedToEdit) {
      getUser()
    }
    textAreaNotNull()

    if (allowedToEdit) {
      getCsrfTokenFromServer()
    }
  }, [urlName])

  return (
    <div className='profile-page'>
      {!editForm ? (
        <div className='profile-page'>
          {allowedToEdit &&
            <button onClick={() => setEditForm(true)}>Éditer</button>
          }
          
          <p>Bonjour { name }</p>
          {createdAt && 
            <p>Vous êtes inscrit depuis le { createdAt }</p>
          }
          <div className="profile-image">
            <h3>Image de profil</h3>

            {!image ? (
                <div className='profile-img'>
                  <img src={defaultUserImg} alt="default-user-pic" /> 
              </div>
            ) : (
              <div className='profile-img'>
                  <img src={'http://localhost:8000/uploads/profile/' + image} alt="user-pic" /> 
              </div>
            )}
          </div>

          <div className="profile-email">
            <h3>Email</h3>
            <p> { email } </p>
          </div>

          {description ? (
            <div className="profile-description">
              <h3>Ma description</h3>
              <p> { description } </p>
            </div>
          ) : (
            <div className="profile-description">
              <h3>Ma description</h3>
              <p>Vous n'avez pas encore ajouté de description vous concernant</p>
            </div>
          )}

          {passions ? (
            <div className="profile-passions">
              <h3>Mes passions</h3>
              <p> { passions } </p>
            </div>
          ) : (
            <div className="profile-passions">
              <h3>Mes passions</h3>
              <p>Vous n'avez pas encore ajouté de passions vous concernant</p>
            </div>
          )}

        </div>

      ) : (
        <div className='edit-profile-page'>
          <button onClick={() => setEditForm(false)}>Ne plus éditer</button>
          <form action="" onSubmit={handleEdit} id="edit-profile-form">
            <meta name="csrf-token" content={csrfToken} />
            <div className='edit-profile-name'>
              <label htmlFor='name'>Nom</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) =>setName(e.target.value)}
              />
            </div>

            <div className="edit-profile-image">
              <h3>Image de profil</h3>
              {!image ? (
                  <div className='profile-img'>
                    <img src={defaultUserImg} alt="default-user-pic" />  
                </div>
              ) : (
                <div className='profile-img'>
                    <img src={'http://localhost:8000/uploads/profile/' + image} alt="user-pic" />  
                </div>
              )}
              <label htmlFor="upload-profile-img">Changer d'image</label>
              <input 
                type="file" 
                id="upload-profile-img" 
                name="file" 
                accept='.jpg, .jpeg, .png'
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            <div className='edit-profile-email'>
              <label htmlFor='email'>Email</label>
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(e) =>setEmail(e.target.value)}
              />
            </div>

            <div className='edit-profile-description'>
              <label htmlFor='description'>Description</label>
              <textarea
                type="text"
                name="description"
                id="description"
                value={description}
                onChange={(e) =>setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className='edit-profile-passions'>
              <label htmlFor='passions'>Passions</label>
              <textarea
                type="text"
                name="passions"
                id="passions"
                value={passions}
                onChange={(e) =>setPassions(e.target.value)}
              ></textarea>
            </div>
            <input type="submit" value="Valider l'édition"/>
          </form>
        </div>
      )}
    </div>
  )
}

export default ProfileAbout
