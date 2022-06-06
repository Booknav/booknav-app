import React, { createContext, useContext } from 'react';
import axios, { AxiosInstance } from 'axios';
import { AuthContext } from './AuthContext';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import * as Keychain from 'react-native-keychain';

export type AxiosContextType = {
  authAxios: AxiosInstance;
  publicAxios: AxiosInstance;
};
const AxiosContext = createContext<AxiosContextType | null>(null);

const AxiosProvider = ({ children }: { children: React.ReactNode }) => {
  const authContext = useContext(AuthContext);
  const baseURL = 'http://localhost:3000/api/v1';

  const authAxios = axios.create({
    baseURL,
  });

  const publicAxios = axios.create({
    baseURL,
  });

  authAxios.interceptors.request.use(
    (config) => {
      if (!config?.headers?.Authorization) {
        if (config.headers) {
          config.headers.Authorization = `Bearer ${authContext?.getAccessToken()}`;
        }
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const refreshAuthLogic = (failedRequest: any) => {
    const data = {
      refreshToken: authContext?.authState.refreshToken,
    };

    const options = {
      method: 'POST',
      data,
      url: baseURL + '/users/refresh',
    };

    return axios(options)
      .then(async (tokenRefreshResponse) => {
        failedRequest.response.config.headers.Authorization =
          'Bearer ' + tokenRefreshResponse.data.accessToken;

        authContext?.setAuthState({
          ...authContext.authState,
          accessToken: tokenRefreshResponse.data.accessToken,
        });

        await Keychain.setGenericPassword(
          'token',
          JSON.stringify({
            accessToken: tokenRefreshResponse.data.accessToken,
            refreshToken: authContext?.authState.refreshToken,
          })
        );

        return Promise.resolve();
      })
      .catch(() => {
        authContext?.setAuthState({
          ...authContext.authState,
          accessToken: null,
          refreshToken: null,
        });
      });
  };

  createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {});

  return (
    <AxiosContext.Provider
      value={{
        authAxios,
        publicAxios,
      }}
    >
      {children}
    </AxiosContext.Provider>
  );
};

export { AxiosContext, AxiosProvider };
