import {useContext, useState} from "react";
import Context from "../../Context/Context";
import {Clipboard, Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCopy, faRobot} from "@fortawesome/free-solid-svg-icons";
import {useToast} from "react-native-toast-notifications";
import StreamType from "../Global/StreamType";

export const Ai = ({text}) => {
    const{Style1}=useContext(Context)
    const toast=useToast()
    return (
        <View style={{
            backgroundColor:Style1.color5,
            elevation:1,
            marginVertical:10
        }}>
            <TouchableOpacity onPress={()=>{
                Clipboard.setString(text)
                toast.show("Copied!",{
                    type: "normal",
                    placement: "bottom",
                    duration: 4000,
                    offset: 30,
                    animationType: "slide-in",
                })
            }} style={{
                position:"absolute",
                right:10,
                top:5
            }}>
                <FontAwesomeIcon icon={ faCopy } style={{
                    padding:10,
                    color:'gray'
                }}/>
            </TouchableOpacity>
            <View style={{
                paddingHorizontal:10,
                paddingTop:10,
                flexDirection:"row",
                alignItems:"center",
            }}>
                <FontAwesomeIcon icon={ faRobot } style={{
                    padding:10,
                    color:Style1.color2
                }}/>
                <Text style={{
                    color:Style1.color2,
                    fontSize:17,
                    paddingLeft:5
                }}>O2</Text>
            </View>
            <StreamType selectable={true} style={{
                color:Style1.color4,
                padding:15,
                paddingTop:2,
                paddingLeft:27,
                marginTop:3,
                fontSize:17,
            }} text={text.split(" ")} delay={1}/>
        </View>
    )
}
