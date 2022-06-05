import React, {createContext, useState} from 'react';
import * as Keychain from 'react-native-keychain';

type Props = {
  children: React.ReactNode;
};
const AuthContext = createContext<AuthContextType | null>(null);

export type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  authenticated: boolean | null;
};

export type AuthContextType = {
  authState: AuthState;
  getAccessToken: () => string | null;
  setAuthState: (authState: AuthState) => void;
  logout: () => void;
};

const AuthProvider = ({children}: Props) => {
  const [authState, setAuthState] = useState<AuthState>({
    accessToken: null,
    refreshToken: null,
    authenticated: null,
  });

  const logout = async () => {
    await Keychain.resetGenericPassword();
    setAuthState({
      accessToken: null,
      refreshToken: null,
      authenticated: false,
    });
  };

  const getAccessToken = () => {
    return authState.accessToken;
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        getAccessToken,
        setAuthState,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
