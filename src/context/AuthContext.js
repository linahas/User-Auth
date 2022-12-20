import { createContext, useReducer, useEffect } from 'react'

const INITIALSTATE={ 
  user: JSON.parse(localStorage.getItem("user")) || null, 
}

export const AuthContext = createContext(INITIALSTATE)

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return INITIALSTATE
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, INITIALSTATE)
  useEffect(()=> {
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])

  
  return (
    <AuthContext.Provider value={{ user:state.user, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}