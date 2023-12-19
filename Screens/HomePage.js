/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import React, {useCallback, useContext} from 'react';
import Context from '../Context/Context';
import EachHistorycard from '../Components/Homepage/EachHistorycard';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export function HomePage({navigation}) {
  const {History, SaveData, setHistory} = useContext(Context);
  const deleteData = index => {
    const data = [...History];
    data.splice(index, 1);
    setHistory(data);
    SaveData();
  };
  return (
    <>
      <ScrollView
        style={{
          height: windowHeight,
          backgroundColor: '#1e1b38',
          paddingHorizontal: windowWidth * 0.045,
          paddingTop: 10,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: windowWidth * 0.07,
            fontWeight: 'bold',
            alignSelf: 'flex-start',
          }}>
          Welcome Back
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: windowWidth * 0.04,
            fontWeight: '300',
            alignSelf: 'flex-start',
          }}>
          Get all your answers.
        </Text>
        <View
          style={{
            flexDirection: 'row',
            gap: 20,
            marginTop: 20,
          }}>
          <EachCard
            title={'MAIL'}
            discreption={'Generate professional mails in with one tap.'}
            image={require('../Assets/mail.png')}
            color={'rgba(33, 64, 133, 0.30)'}
          />
          <EachCard
            title={'CODE'}
            discreption={'Generate error free code in with one tap.'}
            image={require('../Assets/webpage.png')}
            color={'rgba(146, 97, 32, 0.30)'}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 20,
            marginTop: 20,
          }}>
          <EachCard
            title={'AUDIO'}
            discreption={'Chat with your pdf and get the best out of it'}
            image={require('../Assets/audio.png')}
            color={'rgba(136, 48, 48, 0.30)'}
          />
          <EachCard
            title={'AI'}
            discreption={'Chat with your pdf and get the best out of it'}
            image={require('../Assets/ai.png')}
            color={'#2c2250'}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 20,
          }}>
          <Text
            style={{
              fontSize: windowWidth * 0.05,
              color: 'rgb(228, 228, 228)',
              fontWeight: 'bold',
            }}>
            History
          </Text>
        </View>
        {History.length === 0 && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 100,
            }}>
            {<Text style={{color: 'white'}}>No Chats 😕</Text>}
          </View>
        )}
        {History.map((item, index) => (
          <EachHistorycard
            item={item}
            index={index}
            navigation={navigation}
            key={index}
            deleteData={deleteData}
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('ChatPage')}
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          bottom: 0,
          width: windowWidth,
          paddingBottom: 20,
          zIndex: 2,
        }}>
        <TextInput
          onFocus={() => navigation.navigate('ChatPage')}
          style={{
            zIndex: 1,
            marginTop: windowHeight * 0.025,
            width: windowWidth * 0.9,
            marginHorizontal: windowWidth * 0.0015,
            backgroundColor: '#292250',
            paddingHorizontal: 20,
            borderRadius: 20,
            fontSize: windowWidth * 0.04,
            paddingVertical: 20,
          }}
          placeholder="Start Chatting with AI"
          placeholderTextColor={'rgb(197, 195, 195)'}
        />
      </TouchableOpacity>
    </>
  );
}

function EachCard({title, discreption, route, image, color}) {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: color,
        borderRadius: 10,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
      }}>
      <Image source={image} style={{height: 100, width: 100}} />
      <View>
        <Text
          style={{
            color: 'rgb(240, 240, 240)',
            fontSize: 20,
            fontWeight: 'bold',
            paddingHorizontal: 10,
          }}>
          {title}
        </Text>
        <Text
          style={{
            paddingHorizontal: 10,
          }}>
          {discreption}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
