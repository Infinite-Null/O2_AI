/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Clipboard,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Markdown from 'react-native-markdown-display';
import {faCopy} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useToast} from 'react-native-toast-notifications';
import * as Animatable from 'react-native-animatable';

function ResultDisplay({text}) {
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
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          padding: width * 0.04,
          flexDirection: 'column',
          backgroundColor: '#292250',
          maxWidth: width * 0.9,
          borderRadius: 10,
          marginTop: 10,
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
        <View
          style={{
            width: width,
          }}
        />
        <TouchableOpacity
          style={{
            flexBasis: 1,
            backgroundColor: '#4341c2',
            paddingVertical: 15,
            borderRadius: 10,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
          }}
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
          <Text
            style={{
              fontSize: width * 0.034,
              color: 'rgb(224, 224, 224)',
              paddingHorizontal: 2,
            }}>
            {' '}
            Copy{' '}
          </Text>
          <FontAwesomeIcon
            icon={faCopy}
            style={{
              color: 'rgb(224, 224, 224)',
              padding: 0,
            }}
          />
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
}

export default ResultDisplay;
