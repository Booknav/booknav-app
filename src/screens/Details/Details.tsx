import React from 'react';
import { SafeAreaView } from 'react-native';
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

type Props = {
  navigation: any;
};

const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />;

export const DetailsScreen = ({ navigation }: Props) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => <TopNavigationAction icon={BackIcon} onPress={navigateBack} />;

  return (
    <SafeAreaView>
      <TopNavigation title="MyApp" alignment="center" accessoryLeft={BackAction} />
      <Divider />
      <Layout>
        <Text category="h1">DETAILS</Text>
      </Layout>
    </SafeAreaView>
  );
};
