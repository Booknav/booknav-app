import { useNavigation } from '@react-navigation/native';
import { Divider, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import React from 'react';
import OtpInputs from 'react-native-otp-inputs';
import { SafeAreaView } from 'react-native-safe-area-context';

const OtpScreen = () => {
  const [otp, setOtp] = React.useState('');
  const navigation = useNavigation();
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => <TopNavigationAction icon={BackAction} onPress={navigateBack} />;

  return (
    <SafeAreaView>
      <TopNavigation title="MyApp" alignment="center" accessoryLeft={BackAction} />
      <Divider />
      <Layout>
        <OtpInputs
          value={otp}
          autofillFromClipboard={true}
          handleChange={(code) => setOtp(code)}
          numberOfInputs={6}
        />
      </Layout>
    </SafeAreaView>
  );
};

export default OtpScreen;
