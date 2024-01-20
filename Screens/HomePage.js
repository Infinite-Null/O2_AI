/* eslint-disable react-native/no-inline-styles */
import {
    View,
    Dimensions,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image, Pressable,
} from 'react-native';
import React, {useContext} from 'react';
import Context from '../Context/Context';
import EachHistorycard from '../Components/Homepage/EachHistorycard';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMicrophone, faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import * as Animatable from 'react-native-animatable';

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
          showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
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
         <View style={{
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
         }}>
             <Text
                 style={{
                     fontSize: windowWidth * 0.05,
                     color: 'rgb(228, 228, 228)',
                     fontWeight: 'bold',
                     marginTop: 20,
                     marginBottom:10
                 }}>
                 Features
             </Text>
             <Pressable onPress={()=>{
                 navigation.navigate('FeaturesPage')
             }}>
                 <Text
                     style={{
                         fontSize: windowWidth * 0.035,
                         color: 'rgb(144,164,245)',
                         marginTop: 20,
                         marginBottom:10
                     }}>
                     View All  →
                 </Text>
             </Pressable>
         </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 20,
          }}>
          <EachCard
              delay={0}
            title={'MAIL'}
            discreption={'Generate professional mail in one tap.'}
            image={require('../Assets/mail.png')}
            color={'rgba(33, 64, 133, 0.30)'}
            navigation={navigation}
            route={'MailPage'}
          />
          <EachCard
              delay={150}
            title={'CODE'}
            discreption={'Generate error free code in one tap.'}
            image={require('../Assets/webpage.png')}
            color={'rgba(146, 97, 32, 0.25)'}
            navigation={navigation}
            route={'CodePage'}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 20,
            marginTop: 20,
          }}>
          <EachCard
              delay={250}
            title={'Image'}
            discreption={'Chat with image in one tap.'}
            image={require('../Assets/Image.png')}
            color={'rgba(48,136,99,0.18)'}
            navigation={navigation}
            route={'ImageChat'}
          />
          <EachCard
              delay={350}
            title={'PLAGIARISM'}
            discreption={'Remove plagiarism in one tap.'}
            image={require('../Assets/ai.png')}
            color={'#2c2250'}
            route={'PlagiarismPage'}
            navigation={navigation}
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
                    marginBottom:10
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
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            height: 70,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#292250',
            paddingHorizontal: 10,
            borderRadius: 20,
            fontSize: windowWidth * 0.04,
            width: '90%',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ChatPage');
            }}
            style={{
              height: 30,
              width: 30,
              borderRadius: 100000,
              overflow: 'hidden',
              marginRight: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FontAwesomeIcon
              icon={faMicrophone}
              style={{
                color: 'white',
              }}
            />
          </TouchableOpacity>
          <TextInput
            onFocus={() => {
              navigation.navigate('ChatPage');
            }}
            multiline={true}
            numberOfLines={7}
            style={{
              backgroundColor: 'transparent',
              fontSize: 15,
              color: 'rgba(218, 218, 218, 1.00)',
              flex: 1,
            }}
            placeholder={'Ask Anything...'}
            placeholderTextColor={'rgba(202, 202, 202, 0.86)'}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ChatPage');
            }}
            style={{
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 5,
              paddingRight: 10,
            }}>
            <View>
              <FontAwesomeIcon
                icon={faPaperPlane}
                style={{
                  color: 'white',
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

function EachCard({title, discreption, navigation, route, image, color, delay}) {
  return (
    <Animatable.View
      animation={'fadeInUp'}
      delay={delay}
      duration={300}
      style={{
        flex: 1,
        backgroundColor: color,
        borderRadius: 10,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
      }}>
        <TouchableOpacity style={{
            flex: 1,
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
        }} onPress={() => navigation.navigate(route)}>
      <Image source={image} style={{height: 100, width: 100}} />
      <View style={{width: '100%'}}>
        <Text
          style={{
            color: 'rgb(240, 240, 240)',
            fontSize: windowWidth * 0.055,
            fontWeight: 'bold',
            paddingHorizontal: 10,
          }}>
          {title}
        </Text>
        <Text
          style={{
            paddingHorizontal: 10,
            fontSize: windowWidth * 0.033,
              color: 'rgb(240, 240, 240)',
          }}>
          {discreption}
        </Text>
      </View>
        </TouchableOpacity>
    </Animatable.View>
  );
}

export {EachCard}