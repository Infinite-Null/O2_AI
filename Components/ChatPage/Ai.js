/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import Context from '../../Context/Context';
import {
  Dimensions,
  View,
} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import Markdown from 'react-native-markdown-display';

export const Ai = ({text, noLoading = false}) => {
  const width = Dimensions.get('window').width;
  const toast = useToast();
  return (
    <View
      style={{
        marginVertical: 10,
        padding: width * 0.02,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
      }}>
      <View
        style={{
          padding: width * 0.04,
          flexDirection: 'column',
          alignItems: 'flex-end',
          backgroundColor: '#5248a8',
          alignSelf: 'flex-end',
          maxWidth: width * 0.9,
          borderRadius: 10,
          elevation: 1,
        }}>
        <Markdown
          style={{
            fence: {
              backgroundColor: '#080808',
              color: 'rgba(243, 232, 130, 0.88)',
              fontSize: width * 0.027,
              borderRadius: 10,
              borderColor: 'rgba(243, 232, 130, 0.88)',
            },
            code_block: {
              backgroundColor: '#080808',
              color: 'rgba(243, 232, 130, 0.88)',
              fontSize: width * 0.027,
              borderRadius: 10,
              borderColor: 'rgba(243, 232, 130, 0.88)',
            },
            code_inline: {
              backgroundColor: '#080808',
              color: 'rgba(243, 232, 130, 0.88)',
              fontSize: width * 0.027,
              borderRadius: 10,
              borderColor: 'rgba(243, 232, 130, 0.88)',
            },
            list_item: {
              color: 'rgba(243, 243, 243, 0.88)',
              fontSize: width * 0.0335,
              marginVertical: 10,
              height: 'auto',
              alignSelf: 'flex-start',
              flexBasis: 1,
            },
          }}>
          {text}
        </Markdown>
      </View>
    </View>
  );
};

{
  /* <View
style={{
  backgroundColor: Style1.color5,
  elevation: 1,
  marginVertical: 10,
}}>
<TouchableOpacity
  onPress={() => {
    Clipboard.setString(text);
    toast.show('Copied!', {
      type: 'normal',
      placement: 'bottom',
      duration: 4000,
      offset: 30,
      animationType: 'slide-in',
    });
  }}
  style={{
    position: 'absolute',
    right: 10,
    top: 5,
  }}>
  <FontAwesomeIcon
    icon={faCopy}
    style={{
      padding: 10,
      color: 'gray',
    }}
  />
</TouchableOpacity>
<View
  style={{
    paddingHorizontal: 10,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  }}>
  <FontAwesomeIcon
    icon={faRobot}
    style={{
      padding: 10,
      color: Style1.color2,
    }}
  />
  <Text
    style={{
      color: Style1.color2,
      fontSize: 17,
      paddingLeft: 5,
    }}>
    O2
  </Text>
</View>
{!noLoading && (
  <StreamType
    selectable={true}
    style={{
      color: Style1.color4,
      padding: 15,
      paddingTop: 2,
      paddingLeft: 27,
      marginTop: 3,
      fontSize: 17,
    }}
    text={text.split(' ')}
    delay={1}
  />
)}
{noLoading && (
  <Text
    selectable={true}
    style={{
      color: Style1.color4,
      padding: 15,
      paddingTop: 2,
      paddingLeft: 27,
      marginTop: 3,
      fontSize: 17,
    }}>
    {text}
  </Text>
)}
</View> */
}
