import {Image, ScrollView, Text, TextInput, TouchableOpacity, View, Clipboard} from "react-native";
import {TopHeader} from "../Components/Global/TopHeader";
import {useContext, useState} from "react";
import Context from "../Context/Context";
import NativeSyntaxHighlighter from "react-native-syntax-highlighter/src";
import { tomorrowNight } from 'react-syntax-highlighter/styles/hljs';
import {useToast} from "react-native-toast-notifications";
import axios from "axios";

export const CodePage = ({navigation}) => {
    const {Style1}=useContext(Context)
    const[input,setInput]=useState("")
    const [loading,setloading]=useState(false)
    const [code,setCode]=useState("")
    const toast=useToast()
    async function GenerateCode(){
        if(input===""){
            toast.show("Enter Statement",{
                type: "danger",
                placement: "top",
                duration: 4000,
                offset: 30,
                animationType: "zoom-in",
            })
        }else {
            setloading(true)
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage?key=AIzaSyD46fzT8jTrrC8mFSoZWtHFzoCh79MpkYk',
                headers: {
                    'Content-Type': 'application/json',
                },
                data : JSON.stringify({
                    "prompt": {
                        "messages": [
                            {
                                "content": `generate Code for ${input}`
                            }
                        ]
                    }
                })
            }
            axios.request(config).then((r)=>{
                setCode(r.data.candidates[0].content)
                setInput("")
                setloading(false)
            }).catch((e)=>{
                setInput("")
                setloading(false)
                if(e.message==="Network Error"){
                    toast.show("No Internet 😟",{
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
    }
    return (
        <View style={{
            flex:1,
            backgroundColor:Style1.color3
        }}>
            <TopHeader text={"Code"} navigation={navigation}/>
            <ScrollView>
                <View style={{paddingHorizontal:20,}}>
                    <View style={{
                        backgroundColor:Style1.color5,
                        borderTopRightRadius:10,
                        borderTopLeftRadius:10,
                        overflow:"hidden"
                    }}>
                        <TextInput placeholder={"Problem statement"} value={input} onChangeText={(text)=>{
                            setInput(text)
                        }} placeholderTextColor={Style1.color6} style={{
                            backgroundColor:Style1.color5,
                            padding:15,
                            color:Style1.color4,
                        }}/>
                    </View>
                </View>
                {!loading&&<TouchableOpacity onPress={()=>{
                    if(!loading){
                        GenerateCode()
                    }
                }} style={{
                    backgroundColor:Style1.color2,
                    marginHorizontal:20,
                    alignItems:"center",
                    justifyContent:"center",
                    height:50,
                    borderBottomRightRadius:10,
                    borderBottomLeftRadius:10,
                }}><Text style={{
                    textAlign:"center",
                    fontSize:17,
                    fontWeight:"600"
                }}>Generate</Text></TouchableOpacity>}
                {loading&&<View style={{
                    backgroundColor:Style1.color6,
                    marginHorizontal:20,
                    alignItems:"center",
                    justifyContent:"center",
                    height:50,
                    borderBottomRightRadius:10,
                    borderBottomLeftRadius:10,
                }}>
                    <Image source={require("../Assets/loading.gif")} style={{
                        width:100,
                        height:50
                    }}/>
                </View>}
                {code.length!==0 && <View style={{
                    marginBottom:10
                }}>
                    <View style={{
                        padding:18,
                        paddingHorizontal:5,
                        backgroundColor:Style1.color5,
                        marginHorizontal:20,
                        marginTop:20,
                        color:Style1.color2,
                        fontSize:16,
                        borderTopRightRadius:10,
                        borderTopLeftRadius:10,
                    }}>
                        <View style={{
                            alignItems:"flex-end",
                            marginBottom:10
                        }}>
                            <Image source={require("../Assets/dots.png")} style={{
                                height:10,
                                width:50,
                                marginRight:10,
                                objectFit:"fill"
                            }}/>
                        </View>
                        <NativeSyntaxHighlighter
                            wordWrap={true}
                            style={tomorrowNight}
                            highlighter={"hljs"}
                            fontSize={13}
                        >
                            {code}
                        </NativeSyntaxHighlighter>
                    </View>
                    <TouchableOpacity onPress={()=>{
                        Clipboard.setString(code)
                        toast.show("Copied!",{
                            type: "normal",
                            placement: "bottom",
                            duration: 4000,
                            offset: 30,
                            animationType: "slide-in",
                        })
                    }} style={{
                        backgroundColor:Style1.color2,
                        marginHorizontal:20,
                        alignItems:"center",
                        justifyContent:"center",
                        height:50,
                        borderBottomRightRadius:10,
                        borderBottomLeftRadius:10,
                    }}><Text style={{
                        textAlign:"center",
                        fontSize:17,
                        fontWeight:"600"
                    }}>Copy</Text></TouchableOpacity>
                </View>}
            </ScrollView>
        </View>
    )
}
