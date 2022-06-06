import React, {useCallback, useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../screens/Login/Login';
import {DetailsScreen} from '../screens/Details/Details';
import {AuthContext, AuthProvider} from '../context/AuthContext';
import * as Keychain from 'react-native-keychain';
import {AxiosProvider} from '../context/AxiosContext';
import {Loader} from '../Loader/Loader';

const {Navigator, Screen} = createStackNavigator();

const HomeNavigator = () => (
  <Navigator screenOptions={{headerShown: false}}>
    <Screen name="Home" component={LoginScreen} />
    <Screen name="Details" component={DetailsScreen} />
  </Navigator>
);

export const AppNavigator = () => {
  const authContext = useContext(AuthContext);
  const [status, setStatus] = useState('loading');

  const loadJWT = useCallback(async () => {
    try {
      const value = await Keychain.getGenericPassword();
      const jwt = JSON.parse((value && value.password.toString()) || '');

      authContext?.setAuthState({
        accessToken: jwt.accessToken || null,
        refreshToken: jwt.refreshToken || null,
        authenticated: jwt.accessToken !== null,
      });
      setStatus('success');
    } catch (error) {
      setStatus('error');
      console.log(`Keychain Error: ${error}`);
      authContext?.setAuthState({
        accessToken: null,
        refreshToken: null,
        authenticated: false,
      });
    }
  }, []);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  if (status === 'loading') {
    return <Loader />;
  }

  return (
    <AuthProvider>
      <AxiosProvider>
        <NavigationContainer>
          <HomeNavigator />
        </NavigationContainer>
      </AxiosProvider>
    </AuthProvider>
  );
};
