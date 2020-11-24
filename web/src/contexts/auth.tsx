import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react'
import useStoreage from '../hooks/storage';
import api from '../services/api';

const INITIAL_STATE = {
  user: null,
  token: "",
  signed: false
}

interface AuthContextData {
  user: User
  token: string
  signed: boolean
}

interface AuthContextProps {
  state: AuthContextData
  signIn?: (user: UserSignIn) => Promise<void>
  logOut?: () => void
}

export const AuthContext = React.createContext<AuthContextProps>({} as AuthContextProps)

export interface User {
  id: number
  username: string
  email: string
  admin: boolean
}

interface UserSignIn {
  username: string
  password: string
}

interface ResponseSignIn {
  user: User
  token: string
}

export const AuthProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<AuthContextData>(INITIAL_STATE);
  const router = useRouter()
  let storage

  useEffect(() => {
    storage = useStoreage<AuthContextData>()
    if (storage.get('authContext')) {
      setState(storage.get('authContext').data)
    }
  }, [useStoreage, setState])

  const signIn = async (user: UserSignIn) => {
    const response = await api.post<ResponseSignIn>("/auth/login", user)
    const data = response.data

    if (response.status !== 200) {
      throw new Error("SignIn failed: " + response.status)
    }

    const authData = {
      user: data.user,
      token: data.token,
      signed: true
    }

    setState(authData)

    storage.set('authContext', authData)

    router.back()
  }

  const logOut = () => {
    setState(INITIAL_STATE)
    router.reload()
  }

  return (
    <AuthContext.Provider value={{
      state,
      signIn,
      logOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}