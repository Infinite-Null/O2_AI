/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import {Dimensions, View} from 'react-native';
import {Text} from 'react-native-animatable';

export const Initial = ({navigation}) => {
  async function Get() {
    const val = await AsyncStorage.getItem('On');
    console.log(val);
    if (val === 'T') {
      navigation.replace('HomePage');
    } else {
      navigation.replace('Onboarding');
    }
  }
  const width = Dimensions.get('window').width;
  useEffect(() => {
    setTimeout(() => {
      Get();
    }, 1400);
  }, []);
  return (
    <View
      style={{
        backgroundColor: '#1e1b38',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        animation={'fadeIn'}
        delay={300}
        duration={1000}
        style={{
          color: 'white',
          fontSize: width * 0.12,
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
        O2 AI
      </Text>
      <Text
        animation={'fadeIn'}
        delay={700}
        duration={300}
        style={{
          color: 'white',
          fontSize: width * 0.03,
          textAlign: 'center',
        }}>
        best AI experience.
      </Text>
    </View>
  );
};
