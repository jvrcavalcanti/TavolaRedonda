import React, { createContext, useState } from "react";
import api from "../services/api";
import { useHistory } from "react-router-dom";

interface User {
  name: string;
};

interface AuthContextData {
  signed: boolean,
  token: string,
  user: User,
  handleSignIn(name: string | null | File, password: string | null | File): Promise<void>
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const history = useHistory();
  const [signed, setSigned] = useState(false);
  const [user, setUser] = useState({} as User);
  const [token, setToken] = useState('');

  async function handleSignIn(name: string | null | File, password: string | null | File) {
    const response = await api.post("/auth/login", {
      name,
      password
    })
    const data = response.data;
    console.log(data)
    history.goBack()
  }

  return (
    <AuthContext.Provider value = {{
      signed,
      user,
      token,
      handleSignIn
    }}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthContext;