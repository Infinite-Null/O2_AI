/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {Dimensions, Image, Text, View} from 'react-native';
import {useContext} from 'react';
import Context from '../../Context/Context';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

export const Person = ({text}) => {
  const {Style1} = useContext(Context);
  const width = Dimensions.get('window').width;
  return (
    <View
      style={{
        marginVertical: 10,
        padding: width * 0.02,
      }}>
      <View
        style={{
          padding: width * 0.04,
          flexDirection: 'column',
          alignItems: 'flex-start',
          backgroundColor: '#292250',
          alignSelf: 'flex-start',
          maxWidth: width * 0.9,
          borderRadius: 10,
          elevation: 1,
        }}>
        <Text
          style={{
            color: 'rgba(108, 141, 248, 0.75)',
            fontSize: width * 0.03,
          }}>
          You
        </Text>

        <Text
          selectable={true}
          style={{
            color: 'rgba(236, 236, 236, 0.88)',
            fontSize: width * 0.04,
          }}>
          {text}
        </Text>
      </View>
    </View>
  );
};
