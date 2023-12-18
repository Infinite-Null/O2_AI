/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {Dimensions, Image, PermissionsAndroid, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useContext, useEffect, useRef, useState} from "react";
import Context from "../Context/Context";
import {Person} from "../Components/ChatPage/Person";
import {TopHeader} from "../Components/Global/TopHeader";
import {Ai} from "../Components/ChatPage/Ai";
import {useToast} from "react-native-toast-notifications";
import axios from "axios";
import {AiThinking} from "../Components/ChatPage/AiThinking";
import Voice from '@react-native-community/voice';

const windowWidth = Dimensions.get('window').width;

export const ChatPage = ({navigation}) => {
    const dangerColor = "rgba(248, 66, 66, 0.42)"
    const  {History,setHistory,SaveData} = useContext(Context)
    const {Style1}=useContext(Context)
    const [scrollEnabled, setScrollEnabled] = useState(true)
    const Toast = useToast()
    const [loading,setloading]=useState(false)
    const [VoiceRecording,setVoiceRecording]=useState(false)
    const [requestBody,setRequestBody]=useState([
    ])
    const [value,setvalue]=useState("")
    const [chat,setchat]=useState([])
    async function OnPressSend(val) {
        if(val!==""){
            const requestBodyData=[...requestBody]
            requestBodyData.push({content:val})
            setRequestBody(requestBodyData)
            const chats=[...chat]
            chats.push({
                message:val,
                type:"user",
            })
            setchat(chats)
            setvalue("")
        }
    }
    const scrollViewRef = useRef();
    useEffect(()=>{
        if(requestBody.length>0&&chat[chat.length-1].type==="user"){
            setloading(true)
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage?key=AIzaSyD46fzT8jTrrC8mFSoZWtHFzoCh79MpkYk',
                headers: {
                    'Content-Type': 'application/json',
                },
                data : JSON.stringify({
                    "prompt": {"messages": requestBody},
                }),
            }
            axios.request(config).then((r)=>{
                if(r.data.filters){
                    console.log("No")
                    const chats=[...chat]
                    chats.push({
                        message:"My name is O2.ai, developed by Ankit Kumar Shah. How can I help you?",
                        type:"ai",
                    })
                    setchat(chats)
                    setloading(false)
                    return
                }
                const chats=[...chat]
                chats.push({
                    message:r.data.candidates[0].content,
                    type:"ai",
                })
                setchat(chats)
                const requestBodyData=[...requestBody]
                requestBodyData.push({content:r.data.candidates[0].content})
                setRequestBody(requestBodyData)
                setloading(false)
            }).catch((e)=>{
                setloading(false)
                if(e.message==="Network Error"){
                    Toast.show("No Internet 😟",{
                        animationDuration:90,
                        dangerColor: dangerColor,
                        type: "danger",
                        placement: "center",
                        duration: 3000,
                        offset: 30,
                        animationType: "zoom-in",
                    })
                }
                console.log(e.message)
            })
        }
    },[requestBody])
    useEffect(() => {
        Voice.onSpeechStart = onSpeechStartHandler;
        Voice.onSpeechEnd = onSpeechEndHandler;
        Voice.onSpeechResults = onSpeechResultsHandler;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        }
    }, [])
    //History
    useEffect(() => {
        if(chat.length===2){
            const Prev=[...History]
            Prev.push([])
            Prev[Prev.length-1]=[...chat]
            setHistory(Prev)
            SaveData()
            // console.log(Prev)
        }
        if(chat.length>2){
            const Prev=[...History]
            Prev[Prev.length-1]=[...chat]
            setHistory(Prev)
            SaveData()
        }
    }, [chat]);
    const onSpeechStartHandler = (e) => {
        console.log("start handler==>>>", e)
    }
    const onSpeechEndHandler = (e) => {
        setVoiceRecording(false)
        console.log("stop handler", e)
    }

    const onSpeechResultsHandler = (e) => {
        let text = e.value[0]
        setvalue(text)
        console.log("speech result handler", e)
    }

    const startRecording = async () => {
        setVoiceRecording(true)


        try {
            await Voice.start('en-Us')
            const audio=await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO)
            if(audio===false){
                Toast.show("No Audio Permission 😟",{
                    animationDuration:90,
                    type: "danger",
                    placement: "center",
                    dangerColor: dangerColor,
                    duration: 3000,
                    offset: 30,
                    animationType: "zoom-in",
                })
                setVoiceRecording(false)
            }
        } catch (error) {
            console.log("error raised", error)
        }
    }

    const stopRecording = async () => {
        try {
            await Voice.stop()
        } catch (error) {
            console.log("error raised", error)
        }
    }
    return (
        <View style={{
            flex:1,
            backgroundColor:"#1e1b38",
        }}>
            <TopHeader navigation={navigation} text={"Chat"}/>

            <ScrollView contentContainerStyle={{paddingBottom:80}} onScrollBeginDrag={()=>{
                setScrollEnabled(false)
            }}
                        automaticallyAdjustKeyboardInsets={false}
                        keyboardShouldPersistTaps={"never"}
                        overScrollMode={"always"} bounces={true} bouncesZoom={true} ref={scrollViewRef}
                        decelerationRate={"fast"} onContentSizeChange={() => {
                if(scrollEnabled) {
                    scrollViewRef.current.scrollToEnd({animated: true});
                }
            }}>
                {chat.map((e,i)=>{
                    if(e.type==="user"){
                        return <Person text={e.message} key={i}/>
                    }else{
                        return <Ai text={e.message} key={i}/>
                    }
                })}
                {loading&&<AiThinking/>}
            </ScrollView>
            <View style={{
                 position: 'absolute',
                 alignItems: 'center',
                 justifyContent: 'center',
                 bottom: 10,
                 width: windowWidth,
                 zIndex: 2,
            }}>
            <View style={{
                flexDirection:"row",
                height:70,
                alignItems:"center",
                justifyContent:"center",
                backgroundColor: '#292250',
                paddingHorizontal: 10,
                borderRadius: 20,
                fontSize: windowWidth * 0.04,
                width:"90%",
            }}>
                <TouchableOpacity onPress={()=>{
                    if(!VoiceRecording){
                        console.log(Voice.isAvailable())
                        startRecording()
                        setVoiceRecording(true)
                    }else {
                        setVoiceRecording(false)
                        stopRecording()
                    }

                }} style={{
                    height:40,
                    width:40,
                    borderRadius:100000,
                    overflow:"hidden",
                    marginRight:5,
                    justifyContent:"center",
                    alignItems:"center",
                }}>
                    <Image source={(VoiceRecording)?require("../Assets/listning.gif"):require("../Assets/mic.png")} style={{
                        height:VoiceRecording?"100%":"70%",
                        width:VoiceRecording?"100%":"70%",
                        borderRadius:100000,
                    }}/>
                </TouchableOpacity>
                <TextInput multiline={true}
                           numberOfLines={7} autoFocus={true} value={value} onChangeText={(text)=>{
                    setvalue(text)
                }} style={{
                    backgroundColor:'transparent',
                    fontSize:15,
                    color:"rgba(218, 218, 218, 1.00)",
                    flex:1,
                }} placeholder={"Ask Anything..."} placeholderTextColor={'rgba(202, 202, 202, 0.86)'}/>
                {!loading&&<TouchableOpacity onPress={() => {
                    if (value === "") {
                        Toast.show("Please type something...😐😐", {
                            type: "danger",
                            placement: "center",
                            dangerColor: dangerColor,
                            animationDuration:90,
                            duration: 2000,
                            offset: 30,
                            animationType: "zoom-in",
                        })
                        return
                    }
                    setScrollEnabled(true)
                    OnPressSend(value)
                }} style={{
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 5,
                }}>
                    <Image source={require("../Assets/send.png")} style={{
                        height: 25,
                        width: 25,
                        objectFit: "contain",
                    }}/>
                </TouchableOpacity>}
                {loading&& <View style={{
                    height:"100%",
                    alignItems:"center",
                    justifyContent:"center",
                }}>
                    <Image source={require("../Assets/loading.gif")} style={{
                        height:"100%",
                        width:70,
                    }}/>
                </View>}
            </View>
            </View>
        </View>
    )
}