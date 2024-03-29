/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

export const TopHeader = ({navigation, text, righticon}) => {
  const width = Dimensions.get('window').width;
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: width * 0.05,
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.pop();
        }}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          style={{
            padding: width * 0.02,
            color: 'white',
          }}
        />
      </TouchableOpacity>
      <Text
        style={{
          color: 'white',
          fontSize: width * 0.07,
          fontWeight: '700',
        }}>
        {text}
      </Text>
        {righticon && righticon}
        {!righticon && <View style={{
            width:width * 0.07,
        }}/>}
    </View>
  );
};
