import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native';
import {
  Button,
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import OtpInputs from 'react-native-otp-inputs';
import { AxiosContext } from '../../context/AxiosContext';

type Props = {
  navigation: any;
  phone: Number;
  hash: String;
};

const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />;

export const DetailsScreen = ({ navigation, phone, hash }: Props) => {
  const [otp, setOtp] = React.useState<number | null>(null);

  const axiosContext = useContext(AxiosContext);

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />;

  const handleChange = (code: string) => {
    setOtp(parseFloat(code));
  };

  const handleSubmit = () => {
    if (phone) {
      axiosContext?.publicAxios.post('/users/verify', {
        phone: phone,
        hashCode: hash,
        otp,
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="OTP Login" alignment="center" accessoryLeft={BackAction} />
      <Divider />
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category="h1">OTP</Text>
        <OtpInputs
          style={{ backgroundColor: 'blue', flexDirection: 'row' }}
          value={otp?.toString()}
          autofillFromClipboard={false}
          handleChange={(code) => handleChange(code)}
          numberOfInputs={6}
          keyboardType="numbers-and-punctuation"
        />
        <Button onPress={handleSubmit}>
          <Text>Submit</Text>
        </Button>
      </Layout>
    </SafeAreaView>
  );
};
