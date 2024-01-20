/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {Dimensions, Image, PermissionsAndroid, TextInput, TouchableOpacity, View} from 'react-native';
import {useContext, useEffect, useState} from 'react';
import Context from '../Context/Context';
import {TopHeader} from '../Components/Global/TopHeader';
import {useToast} from 'react-native-toast-notifications';
import axios from 'axios';
import Voice from '@react-native-community/voice';
import ChatScroll from '../Components/ChatPage/ChatScroll';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMicrophone, faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import Apikey from '../Apikey';
import {GetGeminiProResponse} from "../AiApi";

const windowWidth = Dimensions.get('window').width;

export const ChatPage = ({navigation,route}) => {
    const dangerColor = 'rgba(172, 79, 79, 1.00)';
    const  {History,setHistory,SaveData} = useContext(Context);
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const Toast = useToast();
    const [loading,setloading] = useState(false);
    const [VoiceRecording,setVoiceRecording] = useState(false);
    const [value,setvalue] = useState('');
    const [chat,setchat] = useState([]);
    async function OnPressSend(val,images) {
        const historyData = [...chat]
        setchat((history)=>[...history,
            {role:'user',
            parts:val}
        ])
        setvalue('');
        setloading(true);
       const response =  await GetGeminiProResponse(historyData,val);
        setchat((history)=>[...history,
            {role:'model', parts:response}
        ])
        setloading(false);
    }
    useEffect(() => {
        Voice.onSpeechStart = onSpeechStartHandler;
        Voice.onSpeechEnd = onSpeechEndHandler;
        Voice.onSpeechResults = onSpeechResultsHandler;
        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);
    useEffect(()=>{
        if (route.params){
            setchat(route.params.item);
        }
    },[]);
     //History
    useEffect(() => {
        if (!route.params){
            if (chat.length === 2){
                const Prev = [...History];
                Prev.unshift([]);
                Prev[0] = [...chat];
                setHistory(Prev);
                SaveData();
                // console.log(Prev)
            }
            if (chat.length > 2){
                const Prev = [...History];
                Prev[0] = [...chat];
                setHistory(Prev);
                SaveData();
            }} else {
            if (chat.length !== History.length && chat.length !== 0){
                const Prev = [...History];
                Prev[route.params.index] = [...chat];
                setHistory(Prev);
                SaveData();
            }
        }
    }, [chat]);
    const onSpeechStartHandler = (e) => {
        console.log('start handler==>>>', e);
    };
    const onSpeechEndHandler = (e) => {
        setVoiceRecording(false);
        console.log('stop handler', e);
    };

    const onSpeechResultsHandler = (e) => {
        let text = e.value[0];
        setvalue(text);
        setVoiceRecording(false);
        console.log('speech result handler', e);
    };

    const startRecording = async () => {
        setVoiceRecording(true);
        try {
            await Voice.start('en-Us');
            const audio = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
            if (audio === false){
                Toast.show('No Audio Permission 😟',{
                    animationDuration:90,
                    type: 'danger',
                    placement: 'center',
                    dangerColor: dangerColor,
                    duration: 3000,
                    offset: 30,
                    animationType: 'zoom-in',
                });
                setVoiceRecording(false);
            }
        } catch (error) {
            console.log('error raised', error);
        }
    };

    const stopRecording = async () => {
        try {
            await Voice.stop();
            setVoiceRecording(false);
        } catch (error) {
            console.log('error raised', error);
            setVoiceRecording(false);
        }
    };
    return (
        <View style={{
            flex:1,
            backgroundColor:'#1e1b38',
        }}>
            <TopHeader navigation={navigation} text={'Chat'}/>
           <ChatScroll chat={chat} scrollEnabled={scrollEnabled}/>
           {/* <AiThinking/> */}
           <View style={{
            height:85,
           }} />
            <View style={{
                 position: 'absolute',
                 alignItems: 'center',
                 justifyContent: 'center',
                 bottom: 10,
                 width: windowWidth,
                 zIndex: 2,
            }}>
            <View style={{
                flexDirection:'row',
                height:70,
                alignItems:'center',
                justifyContent:'center',
                backgroundColor: '#292250',
                paddingHorizontal: 10,
                borderRadius: 20,
                fontSize: windowWidth * 0.04,
                width:'90%',
            }}>
                <TouchableOpacity onPress={()=>{
                    if (!VoiceRecording){
                        console.log(Voice.isAvailable());
                        startRecording();
                        setVoiceRecording(true);
                    } else {
                        setVoiceRecording(false);
                        stopRecording();
                    }

                }} style={{
                    height:30,
                    width:30,
                    borderRadius:100000,
                    overflow:'hidden',
                    marginRight:8,
                    justifyContent:'center',
                    alignItems:'center',

                }}>
                   {!VoiceRecording &&  <FontAwesomeIcon icon={faMicrophone} style={{
                        color:'white',
                    }}/>}
                   {
                    VoiceRecording && <Image source={require('../Assets/listning.gif')} style={{
                        height:'100%',
                        width:'100%',
                        borderRadius:200000000000,
                        overflow:'hidden',
                    }}/>
                   }
                </TouchableOpacity>
                <TextInput multiline={true}
                           numberOfLines={7} autoFocus={true} value={value} onChangeText={(text)=>{
                    setvalue(text);
                }} style={{
                    backgroundColor:'transparent',
                    fontSize:15,
                    color:'rgba(218, 218, 218, 1.00)',
                    flex:1,
                }} placeholder={'Ask Anything...'} placeholderTextColor={'rgba(202, 202, 202, 0.86)'}/>
                {!loading && <TouchableOpacity onPress={() => {
                    if (value === '') {
                        Toast.show('Please type something...😐😐', {
                            type: 'danger',
                            placement: 'center',
                            dangerColor: dangerColor,
                            animationDuration:90,
                            duration: 2000,
                            offset: 30,
                            animationType: 'zoom-in',
                        });
                        return;
                    }
                    setScrollEnabled(true);
                    OnPressSend(value,chat);
                }} style={{
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 5,
                    paddingRight:10,
                }}>
                  <View>
                  <FontAwesomeIcon icon={faPaperPlane} style={{
                        color:'white',
                    }}/>
                  </View>
                </TouchableOpacity>}
                {loading && <View style={{
                    height:'100%',
                    alignItems:'center',
                    justifyContent:'center',
                }}>
                    <Image source={require('../Assets/loading.gif')} style={{
                        height:'100%',
                        width:55,
                    }}/>
                </View>}
            </View>
            </View>
        </View>
    );
};
