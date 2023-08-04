import { useState, useContext, createContext } from "react";

interface AuthContext {
  authenticated: boolean;
  connected: () => void;
  disconnected: () => void;
}

const AuthenticationContext = createContext<AuthContext | null>(null);

export const useAuthentication = () => {
  return (
    useContext(AuthenticationContext) || {
      authenticated: null,
      connected: () => {},
      disconnected: () => {},
    }
  );
};

export const AuthenticationProvider = (props: { children: JSX.Element }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const connected = () => setAuthenticated(true);

  const disconnected = () => setAuthenticated(false);

  const value: AuthContext = {
    authenticated,
    connected,
    disconnected,
  };

  return (
    <AuthenticationContext.Provider value={value}>
      {props.children}
    </AuthenticationContext.Provider>
  );
};
