import { useState } from "react";
import { LoginContext } from "./store";

const LoginContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <LoginContext.Provider
      value={{
        login: (user) => setUser(user),
        logout: () => setUser(null),
        user,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
