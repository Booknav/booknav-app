import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native';
import {
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { AxiosContext } from '../../context/AxiosContext';
import LoginStyles from '../Login/LoginStyles';
import { AuthContext } from '../../context/AuthContext';
import * as Keychain from 'react-native-keychain';

type Props = {
  navigation: any;
  route: {
    params: {
      phone: string;
      hash: string;
    };
  };
};

const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />;

export const DetailsScreen = ({ navigation, route }: Props) => {
  const [otp, setOtp] = React.useState('');
  const { phone, hash } = route.params;

  const axiosContext = useContext(AxiosContext);
  const authContext = useContext(AuthContext);

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />;

  const handleSubmit = () => {
    if (phone) {
      try {
        axiosContext?.publicAxios
          .post('/users/verify', {
            phone: phone,
            hash,
            otp,
          })
          .then((response) => {
            const { accessToken, refreshToken } = response.data;
            if (accessToken) {
              authContext?.setAuthState({
                accessToken,
                refreshToken,
                authenticated: true,
              });
              Keychain.setGenericPassword(
                'token',
                JSON.stringify({
                  accessToken,
                  refreshToken,
                })
              );
            }
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="OTP Login" alignment="center" accessoryLeft={BackAction} />
      <Divider />
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category="h1">OTP</Text>
        {/* <OtpInputs
          style={{ backgroundColor: 'blue', flexDirection: 'row' }}
          value={otp?.toString()}
          autofillFromClipboard={false}
          handleChange={(code) => handleChange(code)}
          numberOfInputs={6}
          keyboardType="numbers-and-punctuation"
        /> */}
        <Input
          keyboardType="phone-pad"
          value={otp}
          onChangeText={(e) => setOtp(e)}
          maxLength={12}
          style={LoginStyles.input}
          placeholder="Enter OTP"
        />
        <Button onPress={handleSubmit}>
          <Text>Submit</Text>
        </Button>
      </Layout>
    </SafeAreaView>
  );
};
