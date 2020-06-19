import React, { createContext, useState } from "react";
import api from "../services/api";
import { useHistory } from "react-router-dom";

interface AuthContextData {
  signed: boolean,
  token: string,
  user: object | null,
  handleSignIn(): Promise<void>
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const history = useHistory();
  const [user, setUser] = useState<object | null>(null);

  async function handleSignIn() {
    const response = await api.get("http://api.github.com/users/jvrcavalcanti")
    console.log(response)
    setUser({});
    history.push("/profile");
  }

  return (
    <AuthContext.Provider value = {{
      signed: !!user,
      user,
      token: '',
      handleSignIn
    }}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthContext;