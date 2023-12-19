/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {Dimensions, Text, View} from 'react-native';
import {memo} from 'react';
import * as Animatable from 'react-native-animatable';

const Person = ({text}) => {
  const width = Dimensions.get('window').width;
  const fadeIn = {
    from: {
      opacity: 0,
      padding: 0,
      marginVertical: 0,
    },
    to: {
      opacity: 1,
      padding: width * 0.02,
      marginVertical: 4,
    },
  };
  return (
    <Animatable.View animation={fadeIn} easing="ease-in-out" duration={250}>
      <View
        style={{
          padding: width * 0.04,
          flexDirection: 'column',
          alignItems: 'flex-start',
          backgroundColor: '#292250',
          alignSelf: 'flex-start',
          maxWidth: width * 0.9,
          borderRadius: 10,
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
            color: 'rgba(236, 236, 236, 1.00)',
            fontSize: width * 0.04,
          }}>
          {text}
        </Text>
      </View>
    </Animatable.View>
  );
};
export default memo(Person);
