import React, { useContext } from "react";
import AuthContext from "../../contexts/auth";

const SignIn: React.FC = () => {
  const { handleSignIn } = useContext(AuthContext);

  function handleCick() {
    handleSignIn()
  }

  return (
    <div>
      SignIn
      <button onClick={handleCick}>
        Login
      </button>
    </div>
  );
};

export default SignIn;