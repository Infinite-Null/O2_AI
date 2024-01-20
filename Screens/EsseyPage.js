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
import Apikey from '../Apikey';
import {GetGeminiProResponse} from "../AiApi";

export const EsseyPage = ({navigation}) => {
  const windowWidth = Dimensions.get('window').width;
  const [input, setInput] = useState('');
  const [loading, setloading] = useState(false);
  const [result, setResult] = useState('');
  const toast = useToast();
  async function GenerateCode() {
    if (input === '') {
      toast.show('Enter Topic', {
        type: 'danger',
        placement: 'center',
        duration: 4000,
        offset: 30,
        animationType: 'zoom-in',
      });
    } else {
      setloading(true);
      try {
        const response = await GetGeminiProResponse([], `generate a detialed essey on topic ${input}`)
        setResult(response);
      }catch (e) {
        if (e.message === 'Network Error') {
          toast.show('No Internet 😟', {
            type: 'danger',
            placement: 'top',
            duration: 3000,
            offset: 30,
            animationType: 'zoom-in',
          });
        }
      }
      setloading(false);
      // setloading(true);
      // let config = {
      //   method: 'post',
      //   maxBodyLength: Infinity,
      //   url:
      //     'https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage?key=' +
      //     Apikey,
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   data: JSON.stringify({
      //     prompt: {
      //       messages: [
      //         {
      //           content: `generate a detialed essey on topic ${input}`,
      //         },
      //       ],
      //     },
      //   }),
      // };
      // axios
      //   .request(config)
      //   .then(r => {
      //     setResult(r.data.candidates[0].content);
      //     setloading(false);
      //   })
      //   .catch(e => {
      //     setloading(false);
      //     if (e.message === 'Network Error') {
      //       toast.show('No Internet 😟', {
      //         type: 'danger',
      //         placement: 'top',
      //         duration: 3000,
      //         offset: 30,
      //         animationType: 'zoom-in',
      //       });
      //     }
      //     console.log(e.message);
      //   });
    }
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#1e1b38',
      }}>
      <TopHeader text={'Essay'} navigation={navigation} />
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
              multiline={true}
              scrollEnabled={true}
              numberOfLines={3}
              placeholder={'Topic'}
              value={input}
              onChangeText={text => {
                setInput(text);
              }}
              placeholderTextColor={'rgb(197, 195, 195)'}
              style={{
                maxHeight: 120,
                textAlignVertical: 'top',
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
          <View
            style={{
              flexDirection: 'row',
              gap: 2,
            }}>
            <TouchableOpacity
              onPress={() => {
                if (!loading) {
                  setInput('');
                }
              }}
              style={{
                backgroundColor: '#4341c2',
                marginLeft: 20,
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                flex: 1,
                borderBottomLeftRadius: 10,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: windowWidth * 0.032,
                  color: 'rgb(236, 236, 236)',
                }}>
                Clear text
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (!loading) {
                  GenerateCode();
                }
              }}
              style={{
                backgroundColor: '#4341c2',
                marginRight: 20,
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                flex: 1,
                borderBottomRightRadius: 10,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: windowWidth * 0.032,
                  color: 'rgb(236, 236, 236)',
                }}>
                Generate
              </Text>
            </TouchableOpacity>
          </View>
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
        {result.length !== 0 && <ResultDiaplay text={result} />}
      </ScrollView>
    </View>
  );
};
