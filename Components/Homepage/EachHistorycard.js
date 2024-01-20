/* eslint-disable react-native/no-inline-styles */
import {Text, TouchableOpacity, Dimensions} from 'react-native';
import React, {memo} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

function EachHistorycard({navigation, item, index, deleteData}) {
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
      onPress={() => navigation.navigate('ChatPage', {item, index})}
      key={index}
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
      <Text style={{color: 'white'}}>
        {getFormattedData(item[0]?.parts ?? '')}
      </Text>
      <TouchableOpacity
        onPress={() => {
          deleteData(index);
        }}>
        <FontAwesomeIcon icon={faTrash} color="white" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default memo(EachHistorycard);
