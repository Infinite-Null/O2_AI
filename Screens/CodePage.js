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

export const CodePage = ({navigation}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [input, setInput] = useState('');
  const [input1, setInput1] = useState('');
  const [loading, setloading] = useState(false);
  const [code, setCode] = useState('');
  const toast = useToast();
  async function GenerateCode() {
    if (input === '') {
      toast.show('Enter Statement', {
        type: 'danger',
        placement: 'top',
        duration: 2000,
        offset: 30,
        animationType: 'zoom-in',
      });
    } else if (input1 === '') {
      toast.show('Enter Language', {
        type: 'danger',
        placement: 'top',
        duration: 2000,
        offset: 30,
        animationType: 'zoom-in',
      });
    } else {
      setloading(true);
      try {
        const response = await GetGeminiProResponse([], `generate Code for ${input} in ${input1}`)
        setCode(response);
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
              clearButtonMode="while-editing"
              multiline={true}
              scrollEnabled={true}
              numberOfLines={6}
              placeholder={'Problem statement'}
              value={input}
              onChangeText={text => {
                setInput(text);
              }}
              placeholderTextColor={'rgb(197, 195, 195)'}
              style={{
                maxHeight: windowHeight * 0.35,
                alignItems: 'flex-start',
                textAlignVertical: 'top',
                backgroundColor: '#292250',
                padding: 15,
                color: 'white',
                borderBottomWidth: 1,
                borderBottomColor: '#100b2e',
              }}
            />
            <TextInput
              clearButtonMode="while-editing"
              placeholder={'Language'}
              value={input1}
              onChangeText={text => {
                setInput1(text);
              }}
              placeholderTextColor={'rgb(197, 195, 195)'}
              style={{
                maxHeight: windowHeight * 0.35,
                alignItems: 'flex-start',
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
        {code.length !== 0 && <ResultDiaplay text={code} />}
      </ScrollView>
    </View>
  );
};
