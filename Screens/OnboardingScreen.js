/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import Onboarding from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dimensions} from 'react-native';

export const OnboardingScreen = ({navigation}) => {
  const width = Dimensions.get('window').width;
  return (
    <Onboarding  
      skipToPage={1}
      titleStyles={{
        fontSize: width * 0.3,
        fontWeight: 'bold',
      }}
      onDone={async () => {
        await AsyncStorage.setItem('On', 'T');
        navigation.replace('HomePage');
      }}
      pages={[
        {
          backgroundColor: '#262152',
          title: 'O2 AI',
          subtitle: 'Your personal AI assistant \n for all your needs',
        },
        {
          backgroundColor: '#1e1b38',
          title: "Let's Go !",
          subtitle: '',
        },
      ]}
    />
  );
};
