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

export const PlagiarismPage = ({navigation}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [input, setInput] = useState('');
  const [loading, setloading] = useState(false);
  const [result, setResult] = useState('');
  const toast = useToast();
  async function GenerateCode() {
    if (input === '') {
      toast.show('Enter Paragraph', {
        type: 'danger',
        placement: 'center',
        duration: 4000,
        offset: 30,
        animationType: 'zoom-in',
      });
    } else {
      setloading(true);
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url:
          'https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage?key=' +
          Apikey,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          prompt: {
            messages: [
              {
                content: `remove plagiarism from following text: \n
                 ${input}`,
              },
            ],
          },
        }),
      };
      axios
        .request(config)
        .then(r => {
          setResult(r.data.candidates[0].content);
          setloading(false);
        })
        .catch(e => {
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
      <TopHeader text={'Plagiarism'} navigation={navigation} />
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
              clearButtonMode="while-editing"
              multiline={true}
              scrollEnabled={true}
              numberOfLines={6}
              placeholder={'Paragraph...'}
              value={input}
              onChangeText={text => {
                setInput(text);
              }}
              placeholderTextColor={'rgb(197, 195, 195)'}
              style={{
                backgroundColor: '#292250',
                alignItems: 'flex-start',
                textAlignVertical: 'top',
                padding: 15,
                maxHeight: windowHeight * 0.35,
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
                Remove plagiarism
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
