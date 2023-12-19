import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React, {memo} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';

function EachHistorycard({navigation, item}) {
  function getFormattedData(text) {
    if (text.length > 35) {
      return text.slice(0, 35) + '...';
    } else {
      return text;
    }
  }
  const windowWidth = Dimensions.get('window').width;
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ChatPage', {item})}
      style={{
        width: windowWidth * 0.9,
        height: 80,
        backgroundColor: '#372e6b',
        borderRadius: 10,
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
      }}>
      <Text style={{color: 'white'}}>{getFormattedData(item[0].message)}</Text>
      <FontAwesomeIcon
        icon={faPaperPlane}
        style={{
          color: 'white',
        }}
      />
    </TouchableOpacity>
  );
}

export default memo(EachHistorycard);
