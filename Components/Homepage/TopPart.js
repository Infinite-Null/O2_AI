/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {Dimensions, Text, View} from 'react-native';
import {useContext} from 'react';
import Context from '../../Context/Context';

export const TopPart = () => {
    const width = Dimensions.get('window').width;
  return (
    <View>
      <Text
        style={{
          color: 'white',
          fontSize: width * 0.07,
          fontWeight: 'bold',
        }}>
       Hello, O2.Ai here
      </Text>
      <Text
        style={{
          color: 'white',
          fontSize: 18,
          fontWeight: '200',
        }}>
        How may I help you today?
      </Text>
    </View>
  );
};
