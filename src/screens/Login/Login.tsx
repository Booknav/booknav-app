import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  TopNavigation,
  useTheme,
} from '@ui-kitten/components';
import LoginStyles from './LoginStyles';
import LoginSvg from '../../assets/undraw_access_account_re_8spm.svg';

type Props = {
  navigation: any;
};

export const LoginScreen = ({navigation}: Props) => {
  const [phone, setPhone] = useState('');
  const navigateDetails = () => {
    navigation.navigate('Details');
  };
  const theme = useTheme();

  return (
    <SafeAreaView style={{flex: 1}}>
      <TopNavigation title="Booknaav Login" alignment="center" />
      <Divider />
      <Layout style={LoginStyles.container}>
        <Layout style={LoginStyles.header}>
          <LoginSvg height={320} width={240} />
        </Layout>
        <Input
          keyboardType="phone-pad"
          value={phone}
          onChangeText={e => setPhone(e)}
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
