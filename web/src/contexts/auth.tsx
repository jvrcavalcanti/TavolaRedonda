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
  handleSignIn(name: string, password: string): Promise<void>,
  handleLogout(): void
};

function loadData(name: string) {
  if (localStorage.getItem(name)) {
    return atob(localStorage.getItem(name) as string);
  }
  return null;
}

function saveData(name: string, value: any) {
  localStorage.setItem(name, btoa(value))
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const history = useHistory();
  const [signed, setSigned] = useState(!!loadData("signed"));
  const [user, setUser] = useState(JSON.parse(loadData("user") ?? "{}") as User);
  const [token, setToken] = useState(loadData("token") ?? "");

  async function handleSignIn(name: string | null | File, password: string | null | File) {
    const response = await api.post("/auth/login", {
      name,
      password
    })
    const data = response.data.data;
    saveData("token", data.token);
    setToken(data.token)
    saveData("user", JSON.stringify(data.user));
    setUser(data.user);
    saveData("signed", true);
    setSigned(true);
    history.goBack()
  }

  function handleLogout() {
    setToken("")
    setUser({} as User)
    setSigned(false)
    localStorage.clear();
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