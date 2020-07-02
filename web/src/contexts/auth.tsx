import React, { createContext, useState } from "react";
import api from "../services/api";
import { useHistory } from "react-router-dom";

interface User {
  id: Number;
  name: string;
  email: string;
  is_admins: boolean;
};

interface UserRegister{
  name: string;
  password: string;
  email: string;
}

interface AuthContextData {
  signed: boolean,
  token: string,
  user: User,
  handleSignIn(name: string, password: string): Promise<boolean>,
  handleLogout(): void,
  handleRegister(data: UserRegister): Promise<void>
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
    try {
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
      return true;
    } catch (e) {
      return false;
    }
  }

  function handleLogout() {
    setToken("")
    setUser({} as User)
    setSigned(false)
    localStorage.clear();
  }
  
  async function handleRegister(data: UserRegister) {

    const response = await api.post("/auth/register", data);
    const responseData = response.data;

    if (response.status === 200) {
      handleSignIn(data.name, data.password)
    }
  }

  return (
    <AuthContext.Provider value = {{
      signed,
      user,
      token,
      handleSignIn,
      handleLogout,
      handleRegister
    }}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthContext;