/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {useContext, useState} from 'react';
import Context from '../../Context/Context';
import {Clipboard, Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCopy, faRobot} from '@fortawesome/free-solid-svg-icons';
import TypeWriter from 'react-native-typewriter';

export const AiThinking = () => {
  const [random, setRandom] = useState(Math.floor(Math.random() * 7));
  const Dailogs = [
    'Thinking...💭',
    'Till I am thinking your answer, Did you know:\nPeater Parker is Spiderman🕸️',
    'While I am thinking, Do you know:\n"The Eiffel Tower can be 15 cm taller during the summer🧠"',
    'Your response is on the route...🚗',
    'Your answer is on the way, Till the time here is a fun fact:\n"Scotland\'s national animal is unicorn!🫏"',
    'Spinning the hamster wheel of progress...🐭',
    'Riding the waves of data...👩‍💻',
  ];
  const [writing, setWriting] = useState(1);
  const width = Dimensions.get('window').width;
  return (
    <View
      style={{
        padding: width * 0.02,
        marginVertical: 4,
      }}>
      <View
        style={{
          backgroundColor: '#5248a8',
          alignSelf: 'flex-end',
          fontSize: 17,
          borderRadius: 10,
          padding: width * 0.04,
        }}>
        <TypeWriter
          minDelay={1}
          maxDelay={1}
          typing={writing}
          style={{
            color: 'white',
          }}
          onTypingEnd={() => {
            if (writing === -1) {
              setRandom(Math.floor(Math.random() * 7));
              setTimeout(() => {
                setWriting(1);
              }, 1000);
            } else {
              setTimeout(() => {
                setWriting(-1);
              }, 5000);
            }
          }}>
          {Dailogs[random]}
        </TypeWriter>
      </View>
    </View>
  );
};
