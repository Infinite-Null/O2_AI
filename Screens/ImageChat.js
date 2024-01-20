import {launchImageLibrary} from 'react-native-image-picker';
import {Button, Dimensions, Image, PermissionsAndroid, TextInput, TouchableOpacity, View} from "react-native";

import {TopHeader} from "../Components/Global/TopHeader";
import ChatScroll from "../Components/ChatPage/ChatScroll";
import Voice from "@react-native-community/voice";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faEye, faImage, faMicrophone, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {useToast} from "react-native-toast-notifications";
import {useEffect, useState} from "react";
import ImageView from "../Components/ImageView/ImageView";
import {GetImageResponse} from "../AiApi";
const windowWidth = Dimensions.get('window').width;

export default function ImageChat({navigation}) {
    const dangerColor = 'rgba(172, 79, 79, 1.00)';
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const Toast = useToast();
    const [loading,setloading] = useState(false);
    const [VoiceRecording,setVoiceRecording] = useState(false);
    const [value,setvalue] = useState('');
    const [chat,setchat] = useState([]);
    const [image, setImage] = useState([]);
    const [visible, setVisible] = useState(false);
    async function PickImage() {
        const data = await launchImageLibrary({
            includeBase64:true,
            mediaType:'photo',
        })
        if(data.assets[0].fileSize>=4000000){
            Toast.show('File too big...😐😐', {
                type: 'danger',
                placement: 'center',
                dangerColor: dangerColor,
                animationDuration:90,
                duration: 2000,
                offset: 30,
                animationType: 'zoom-in',
            });
            return
        }
        setImage(data.assets)
    }
    async function OnPressSend(val,images) {
        setchat((history)=>[...history,
            {role:'user',
                parts:val}
        ])
        setvalue('');
        setloading(true);
        try{
            const response =  await GetImageResponse(images,val);
            setchat((history)=>[...history,
                {role:'model', parts:response}
            ])
        }catch (e) {

        }
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
            width:windowWidth,
        }}>
            <ImageView visible={visible} setvisible={setVisible} image={image}/>
            <TopHeader navigation={navigation} text={'Image'} righticon={
                <TouchableOpacity onPress={()=>{
                    setVisible(true)
                }} style={{
                    backgroundColor:'rgb(42,82,176)',
                    height:40,
                    width:40,
                    alignItems:'center',
                    justifyContent:'center',
                    borderRadius:10,
                    elevation:10
                }}>
                    <FontAwesomeIcon icon={faEye} style={{
                        color:'white',
                    }}/>
                </TouchableOpacity>
            }/>
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
                        setScrollEnabled(true);
                        PickImage()
                    }} style={{
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 5,
                        paddingRight:10,
                    }}>
                        <View>
                            <FontAwesomeIcon icon={faImage} style={{
                                color:'white',
                            }}/>
                        </View>
                    </TouchableOpacity>}
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
                        if(image.length === 0){
                            Toast.show('Please select image...😐😐', {
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
                        OnPressSend(value,image);
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
}