import {Image, ScrollView,Clipboard, Text, TextInput, TouchableOpacity, View} from "react-native";
import {TopHeader} from "../Components/Global/TopHeader";
import {useContext, useState} from "react";
import Context from "../Context/Context";
import {useToast} from "react-native-toast-notifications";
import axios from "axios";

export const MailPage = ({navigation}) => {
    const {Style1} = useContext(Context)
    const Toast=useToast()
    const [loading,setloading]=useState(false)
    const [valueName,setvalueName]=useState("")
    const [valueTo,setvalueTo]=useState("")
    const [valueSubject,setvalueSubject]=useState("")
    const [email,setemail]=useState("")
    async function ComposeEmail() {
        if(valueName===""){
            Toast.show("Enter From 😐",{
                type: "danger",
                placement: "bottom",
                duration: 4000,
                offset: 30,
                animationType: "zoom-in",
            })
        }else if(valueTo==="") {
            Toast.show("Enter To 😐",{
                type: "danger",
                placement: "bottom",
                duration: 4000,
                offset: 30,
                animationType: "zoom-in",
            })
        }else if(valueSubject==="") {
            Toast.show("Enter Reason 😐",{
                type: "danger",
                placement: "bottom",
                duration: 4000,
                offset: 30,
                animationType: "zoom-in",
            })
        }else{
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
                                "content": `compose an email from ${valueName} to ${valueTo} in subject of ${valueSubject} in a proper format`
                            }
                        ]
                    }
                })
            }
            axios.request(config).then((r)=>{
                setemail(r.data.candidates[0].content)
                setvalueName("")
                setvalueSubject("")
                setvalueTo("")
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
                    return
                }
                setvalueName("")
                setvalueSubject("")
                setvalueTo("")
                console.log(e.message)
            })
        }
    }
    return (
        <View style={{
            flex:1,
            backgroundColor:Style1.color3
        }}>
            <TopHeader text={"Mail"} navigation={navigation}/>
            <ScrollView>
                <View style={{paddingHorizontal:20,}}>
                   <View style={{
                       backgroundColor:Style1.color5,
                       borderTopRightRadius:10,
                       borderTopLeftRadius:10,
                       overflow:"hidden"
                   }}>
                       <TextInput placeholder={"From"} placeholderTextColor={Style1.color6} style={{
                           backgroundColor:Style1.color5,
                           padding:15,
                           color:Style1.color4,
                       }} value={valueName} onChangeText={(text)=>{
                           setvalueName(text)
                       }}/>
                       <View style={{borderBottomWidth:1,borderColor:Style1.color4,marginHorizontal:25}}></View>
                   </View>
                </View>
                <View style={{paddingHorizontal:20}}>
                    <View style={{
                        backgroundColor:Style1.color5,
                    }}>
                        <TextInput placeholder={"To"} placeholderTextColor={Style1.color6} style={{
                            backgroundColor:Style1.color5,
                            padding:15,
                            color:Style1.color4
                        }} value={valueTo} onChangeText={(text)=>{
                            setvalueTo(text)
                        }}/>
                        <View style={{borderBottomWidth:1,borderColor:Style1.color4,marginHorizontal:25}}></View>
                    </View>
                </View>
                <View style={{paddingHorizontal:20}}>
                    <TextInput placeholder={"Subject"} placeholderTextColor={Style1.color6} style={{
                        backgroundColor:Style1.color5,
                        padding:15,
                        color:Style1.color4,
                    }} value={valueSubject} onChangeText={(text)=>{
                        setvalueSubject(text)
                    }}/>
                </View>
                {!loading&&<TouchableOpacity onPress={()=>{
                    ComposeEmail()
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
                }}>Compose</Text></TouchableOpacity>}
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

                {email!==""&&<View style={{marginBottom:10}}>
                    <Text selectable={true} style={{
                        padding:18,
                        backgroundColor:Style1.color5,
                        marginHorizontal:20,
                        marginTop:20,
                        color:Style1.color4,
                        fontSize:16,
                        borderTopRightRadius:10,
                        borderTopLeftRadius:10,
                    }}>
                        {email}
                    </Text>
                    <TouchableOpacity onPress={()=>{
                        Clipboard.setString(email)
                        Toast.show("Copied!",{
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
