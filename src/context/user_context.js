import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
  const { loginWithRedirect, logout, user } = useAuth0(); //直接使用 useAuth0 取得 user login state

  const [myUser, setMyUser] = useState(null)

  //monitoring user login state
  useEffect(() => {
    setMyUser(user)
  }, [user])

  return (
    <UserContext.Provider value={{ loginWithRedirect, logout, myUser }}>
      {children}
    </UserContext.Provider>
  )
}

// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
