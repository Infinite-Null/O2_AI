import {Image, PermissionsAndroid, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useContext, useEffect, useRef, useState} from "react";
import Context from "../Context/Context";
import {Person} from "../Components/ChatPage/Person";
import {TopHeader} from "../Components/Global/TopHeader";
import {Ai} from "../Components/ChatPage/Ai";
import {useToast} from "react-native-toast-notifications";
import axios from "axios";
import {AiThinking} from "../Components/ChatPage/AiThinking";
import Voice from '@react-native-community/voice';

export const HistoryChatPage = ({navigation,route}) => {
    const  {History,setHistory,SaveData} = useContext(Context)
    const {Style1}=useContext(Context)
    const [scrollEnabled, setScrollEnabled] = useState(true)
    const Toast = useToast()
    const [loading,setloading]=useState(false)
    const [VoiceRecording,setVoiceRecording]=useState(false)
    const [requestBody,setRequestBody]=useState([])
    const [value,setvalue]=useState("")
    const [chat,setchat]=useState(route.params.data)
    async function OnPressSend(val) {
        if(val!==""){
            const requestBodyData=[...requestBody]
            requestBodyData.push({content:val})
            setRequestBody(requestBodyData)
            const chats=[...chat]
            chats.push({
                message:val,
                type:"user"
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
                    "prompt": {"messages": requestBody}
                })
            }
            axios.request(config).then((r)=>{
                if(r.data.filters){
                    console.log("No")
                    const chats=[...chat]
                    chats.push({
                        message:"My name is O2.ai, developed by Ankit Kumar Shah. How can I help you?",
                        type:"ai"
                    })
                    setchat(chats)
                    setloading(false)
                    return
                }
                const chats=[...chat]
                chats.push({
                    message:r.data.candidates[0].content,
                    type:"ai"
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
                        type: "danger",
                        placement: "top",
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
        // if(chat.length===2){
        //     const Prev=[...History]
        //     Prev.push([])
        //     Prev[Prev.length-1]=[...chat]
        //     setHistory(Prev)
        //     // console.log(Prev)
        // }
        // if(chat.length>2){
        //     const Prev=[...History]
        //     Prev[Prev.length-1]=[...chat]
        //     setHistory(Prev)
        // }
        const Prev=[...History]
        Prev[route.params.index]=[...chat]
        setHistory(Prev)
        SaveData()
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
        const audio=await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO)
        if(audio===false){
            Toast.show("No Audio Permission 😟",{
                type: "danger",
                placement: "top",
                duration: 3000,
                offset: 30,
                animationType: "zoom-in",
            })
            setVoiceRecording(false)
        }

        try {
            await Voice.start('en-Us')
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
            backgroundColor:Style1.color3
        }}>
            <TopHeader navigation={navigation} text={"Chat"}/>

            <ScrollView onScrollBeginDrag={()=>{
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
                        if(i<route.params.data.length){
                            return <Ai text={e.message} key={i} noLoading={true}/>
                        }
                        else{
                            return <Ai text={e.message} key={i} />
                        }

                    }
                })}
                {loading&&<AiThinking/>}
            </ScrollView>
            <View style={{
                paddingHorizontal:10,
                backgroundColor:Style1.color5,
                flexDirection:"row",
                height:70,
                alignItems:"center",
                justifyContent:"center"
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
                    alignItems:"center"
                }}>
                    <Image source={(VoiceRecording)?require("../Assets/listning.gif"):require("../Assets/mic.png")} style={{
                        height:VoiceRecording?"100%":"70%",
                        width:VoiceRecording?"100%":"70%",
                        borderRadius:100000
                    }}/>
                </TouchableOpacity>
                <TextInput autoFocus={true} value={value} onChangeText={(text)=>{
                    setvalue(text)
                }} style={{
                    backgroundColor:Style1.color5,
                    fontSize:15,
                    color:Style1.color4,
                    flex:1
                }} placeholder={"Ask Anything..."} placeholderTextColor={Style1.color4}/>
                {!loading&&<TouchableOpacity onPress={() => {
                    if (value === "") {
                        Toast.show("Please type something...😐😐", {
                            type: "danger",
                            placement: "top",
                            duration: 3000,
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
                    justifyContent: "center"
                }}>
                    <Image source={require("../Assets/send.png")} style={{
                        height: 50,
                        width: 30,
                        objectFit: "contain"
                    }}/>
                </TouchableOpacity>}
                {loading&& <View style={{
                    height:"100%",
                    alignItems:"center",
                    justifyContent:"center"
                }}>
                    <Image source={require("../Assets/loading.gif")} style={{
                        height:"100%",
                        width:70,
                    }}/>
                </View>}
            </View>
        </View>
    )
}
