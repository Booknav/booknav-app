import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Divider, Icon, Input, Layout, TopNavigation, useTheme } from '@ui-kitten/components';
import LoginStyles from './LoginStyles';
import LoginSvg from '../../assets/undraw_access_account_re_8spm.svg';
import { AxiosContext } from '../../context/AxiosContext';
import { LoginResponse } from '../../types';

type Props = {
  navigation: any;
};

export const LoginScreen = ({ navigation }: Props) => {
  const [phone, setPhone] = useState('');
  const axiosContext = useContext(AxiosContext);

  const navigateDetails = () => {
    try {
      axiosContext?.publicAxios
        .post('/users/otp/', { phone })
        .then((response: LoginResponse) =>
          navigation.navigate('Details', { phone, hash: response.data.hash })
        );
    } catch (exception) {
      console.log(exception);
    }
  };
  const theme = useTheme();

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="Booknaav Login" alignment="center" />
      <Divider />
      <Layout style={LoginStyles.container}>
        <Layout style={LoginStyles.header}>
          <LoginSvg height={320} width={240} />
        </Layout>
        <Input
          keyboardType="phone-pad"
          value={phone}
          onChangeText={(e) => setPhone(e)}
          maxLength={12}
          style={LoginStyles.input}
          placeholder="Enter your phone"
          accessoryRight={
            <Icon
              name="arrow-forward-outline"
              fill={theme['color-primary-default']}
              style={LoginStyles.inputIcon}
              onPress={navigateDetails}
            />
          }
        />
      </Layout>
    </SafeAreaView>
  );
};
