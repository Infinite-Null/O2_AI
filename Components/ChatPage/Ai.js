/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import {Clipboard, Dimensions, TouchableOpacity, View} from 'react-native';
import Markdown from 'react-native-markdown-display';
import {faCopy} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useToast} from 'react-native-toast-notifications';
import * as Animatable from 'react-native-animatable';

function Ai({text}) {
  const width = Dimensions.get('window').width;
  const Toast = useToast();
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
    <Animatable.View
      animation={fadeIn}
      easing="ease-in-out"
      duration={250}
      style={{
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
        }}>
        <Markdown
          style={{
            text: {
              color: 'rgb(236, 236, 236)',
            },
            blockquote: {
              backgroundColor: '#201d1d',
              color: 'rgba(243, 232, 130, 0.88)',
              fontSize: width * 0.033,
              borderRadius: 10,
              borderColor: 'rgba(243, 232, 130, 0.88)',
            },
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
              backgroundColor: 'rgba(0,0,0,0)',
              color: 'rgba(214, 200, 74, 1.00)',
              fontSize: width * 0.034,
              borderRadius: 1000,
              fontWeight: 'bold',
            },
            list_item: {
              color: 'rgba(243, 243, 243, 0.98)',
              fontSize: width * 0.0335,
              marginVertical: 10,
              height: 'auto',
              alignSelf: 'flex-start',
              flexBasis: 1,
            },
          }}>
          {text}
        </Markdown>
        <TouchableOpacity
          onPress={() => {
            Clipboard.setString(text);
            Toast.show('Copied to clipboard', {
              animationDuration: 90,
              type: 'success',
              placement: 'center',
              successColor: 'rgba(55, 145, 62, 1.00)',
              duration: 1200,
              offset: 30,
              animationType: 'zoom-in',
            });
          }}>
          <FontAwesomeIcon
            icon={faCopy}
            style={{
              color: 'white',
            }}
          />
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
}

export default memo(Ai);

// {
//   /* <View
// style={{
//   backgroundColor: Style1.color5,
//   elevation: 1,
//   marginVertical: 10,
// }}>
// <TouchableOpacity
//   onPress={() => {
//     Clipboard.setString(text);
//     toast.show('Copied!', {
//       type: 'normal',
//       placement: 'bottom',
//       duration: 4000,
//       offset: 30,
//       animationType: 'slide-in',
//     });
//   }}
//   style={{
//     position: 'absolute',
//     right: 10,
//     top: 5,
//   }}>
//   <FontAwesomeIcon
//     icon={faCopy}
//     style={{
//       padding: 10,
//       color: 'gray',
//     }}
//   />
// </TouchableOpacity>
// <View
//   style={{
//     paddingHorizontal: 10,
//     paddingTop: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//   }}>
//   <FontAwesomeIcon
//     icon={faRobot}
//     style={{
//       padding: 10,
//       color: Style1.color2,
//     }}
//   />
//   <Text
//     style={{
//       color: Style1.color2,
//       fontSize: 17,
//       paddingLeft: 5,
//     }}>
//     O2
//   </Text>
// </View>
// {!noLoading && (
//   <StreamType
//     selectable={true}
//     style={{
//       color: Style1.color4,
//       padding: 15,
//       paddingTop: 2,
//       paddingLeft: 27,
//       marginTop: 3,
//       fontSize: 17,
//     }}
//     text={text.split(' ')}
//     delay={1}
//   />
// )}
// {noLoading && (
//   <Text
//     selectable={true}
//     style={{
//       color: Style1.color4,
//       padding: 15,
//       paddingTop: 2,
//       paddingLeft: 27,
//       marginTop: 3,
//       fontSize: 17,
//     }}>
//     {text}
//   </Text>
// )}
// </View> */
// }
