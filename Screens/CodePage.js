/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Clipboard,
  Dimensions,
} from 'react-native';
import {TopHeader} from '../Components/Global/TopHeader';
import {useState} from 'react';
import {useToast} from 'react-native-toast-notifications';
import axios from 'axios';
import ResultDiaplay from '../Components/Global/ReaultDiaplay';

export const CodePage = ({navigation}) => {
  const windowWidth = Dimensions.get('window').width;
  const [input, setInput] = useState('');
  const [loading, setloading] = useState(false);
  const [code, setCode] = useState('');
  const toast = useToast();
  async function GenerateCode() {
    if (input === '') {
      toast.show('Enter Statement', {
        type: 'danger',
        placement: 'top',
        duration: 4000,
        offset: 30,
        animationType: 'zoom-in',
      });
    } else {
      setloading(true);
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage?key=AIzaSyD46fzT8jTrrC8mFSoZWtHFzoCh79MpkYk',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          prompt: {
            messages: [
              {
                content: `generate Code for ${input}`,
              },
            ],
          },
        }),
      };
      axios
        .request(config)
        .then(r => {
          setCode(r.data.candidates[0].content);
          setInput('');
          setloading(false);
        })
        .catch(e => {
          setInput('');
          setloading(false);
          if (e.message === 'Network Error') {
            toast.show('No Internet 😟', {
              type: 'danger',
              placement: 'top',
              duration: 3000,
              offset: 30,
              animationType: 'zoom-in',
            });
          }
          console.log(e.message);
        });
    }
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#1e1b38',
      }}>
      <TopHeader text={'Code'} navigation={navigation} />
      <ScrollView>
        <View style={{paddingHorizontal: 20}}>
          <View
            style={{
              backgroundColor: '#292250',
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              overflow: 'hidden',
            }}>
            <TextInput
              placeholder={'Problem statement'}
              value={input}
              onChangeText={text => {
                setInput(text);
              }}
              placeholderTextColor={'rgb(197, 195, 195)'}
              style={{
                backgroundColor: '#292250',
                padding: 15,
                color: 'white',
                borderBottomWidth: 1,
                borderBottomColor: '#100b2e',
              }}
            />
          </View>
        </View>
        {!loading && (
          <TouchableOpacity
            onPress={() => {
              if (!loading) {
                GenerateCode();
              }
            }}
            style={{
              backgroundColor: '#4341c2',
              marginHorizontal: 20,
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: windowWidth * 0.035,
                color: 'rgb(236, 236, 236)',
              }}>
              Generate
            </Text>
          </TouchableOpacity>
        )}
        {loading && (
          <View
            style={{
              backgroundColor: '#292250',
              marginHorizontal: 20,
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}>
            <Image
              source={require('../Assets/loading.gif')}
              style={{
                width: 100,
                height: 50,
              }}
            />
          </View>
        )}
        {code.length !== 0 && <ResultDiaplay text={code} />}
      </ScrollView>
    </View>
  );
};
