import React, { createContext, useState } from "react";
import api from "../services/api";
import { useHistory } from "react-router-dom";

interface User {
  id: Number;
  name: string;
  email: string;
  is_admins: boolean;
};

interface AuthContextData {
  signed: boolean,
  token: string,
  user: User,
  handleSignIn(name: string | null | File, password: string | null | File): Promise<void>,
  handleLogout(): void
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
    const data = response.data.data;
    setToken(data.token)
    setUser(data.user);
    setSigned(true);
    history.goBack()
  }

  function handleLogout() {
    setToken("")
    setUser({} as User)
    setSigned(false)
  }  

  return (
    <AuthContext.Provider value = {{
      signed,
      user,
      token,
      handleSignIn,
      handleLogout
    }}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthContext;