/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ScrollView,
  Clipboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {TopHeader} from '../Components/Global/TopHeader';
import {useState} from 'react';
import {useToast} from 'react-native-toast-notifications';
import axios from 'axios';

export const MailPage = ({navigation}) => {
  const width = Dimensions.get('window').width;
  const Toast = useToast();
  const [loading, setloading] = useState(false);
  const [valueName, setvalueName] = useState('');
  const [valueTo, setvalueTo] = useState('');
  const [valueSubject, setvalueSubject] = useState('');
  const [email, setemail] = useState('');
  async function ComposeEmail() {
    if (valueName === '') {
      Toast.show('Enter From 😐', {
        type: 'danger',
        placement: 'bottom',
        duration: 2000,
        offset: 30,
        animationType: 'zoom-in',
      });
    } else if (valueTo === '') {
      Toast.show('Enter To 😐', {
        type: 'danger',
        placement: 'bottom',
        duration: 2000,
        offset: 30,
        animationType: 'zoom-in',
      });
    } else if (valueSubject === '') {
      Toast.show('Enter Reason 😐', {
        type: 'danger',
        placement: 'bottom',
        duration: 2000,
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
                content: `compose an email from ${valueName} to ${valueTo} in subject of ${valueSubject} in a proper format`,
              },
            ],
          },
        }),
      };
      axios
        .request(config)
        .then(r => {
          setemail(r.data.candidates[0].content);
          setvalueName('');
          setvalueSubject('');
          setvalueTo('');
          setloading(false);
        })
        .catch(e => {
          setloading(false);
          if (e.message === 'Network Error') {
            Toast.show('No Internet 😟', {
              type: 'danger',
              placement: 'top',
              duration: 2000,
              offset: 30,
              animationType: 'zoom-in',
            });
            return;
          }
          setvalueName('');
          setvalueSubject('');
          setvalueTo('');
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
      <TopHeader text={'Mail'} navigation={navigation} />
      <ScrollView>
        <View style={{paddingHorizontal: 20}}>
          <View
            style={{
              backgroundColor: '#1e1b38',
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              overflow: 'hidden',
            }}>
            <TextInput
              placeholder={'From'}
              placeholderTextColor={'rgb(226, 226, 226)'}
              style={{
                backgroundColor: '#292250',
                padding: 15,
                color: '#fff',
                borderBottomColor: '#0b081f',
                borderBottomWidth: 1,
              }}
              value={valueName}
              onChangeText={text => {
                setvalueName(text);
              }}
            />
          </View>
        </View>
        <View style={{paddingHorizontal: 20}}>
          <View
            style={{
              backgroundColor: 'white',
            }}>
            <TextInput
              placeholder={'To'}
              placeholderTextColor={'rgb(226, 226, 226)'}
              style={{
                backgroundColor: '#292250',
                padding: 15,
                color: '#fff',
                borderBottomColor: '#0b081f',
                borderBottomWidth: 1,
              }}
              value={valueTo}
              onChangeText={text => {
                setvalueTo(text);
              }}
            />
          </View>
        </View>
        <View style={{paddingHorizontal: 20}}>
          <TextInput
            placeholder={'Subject'}
            placeholderTextColor={'rgb(226, 226, 226)'}
            style={{
              backgroundColor: '#292250',
              padding: 15,
              color: '#fff',
              borderBottomColor: '#0b081f',
              borderBottomWidth: 1,
            }}
            value={valueSubject}
            onChangeText={text => {
              setvalueSubject(text);
            }}
          />
        </View>
        {!loading && (
          <TouchableOpacity
            onPress={() => {
              ComposeEmail();
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
                fontSize: width * 0.036,
                color: 'white',
              }}>
              Compose
            </Text>
          </TouchableOpacity>
        )}
        {loading && (
          <View
            style={{
              backgroundColor: '#413f88',
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

        {email !== '' && (
          <View style={{marginBottom: 10}}>
            <Text
              selectable={true}
              style={{
                padding: 18,
                backgroundColor: '#3b3480',
                marginHorizontal: 20,
                marginTop: 20,
                color: 'white',
                fontSize: width * 0.038,
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
              }}>
              {email}
            </Text>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setString(email);
                Toast.show('Copied!', {
                  type: 'normal',
                  placement: 'bottom',
                  duration: 4000,
                  offset: 30,
                  animationType: 'slide-in',
                });
              }}
              style={{
                backgroundColor: '#4341c2',
                marginHorizontal: 20,
                alignItems: 'center',
                justifyContent: 'center',
                height: 50,
                borderBottomRightRadius: 15,
                borderBottomLeftRadius: 15,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: width * 0.036,
                  color: 'white',
                }}>
                Copy
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
