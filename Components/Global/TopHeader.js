import {Image, Text, TouchableOpacity, View} from "react-native";
import {useContext} from "react";
import Context from "../../Context/Context";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

export const  TopHeader= ({navigation,text}) => {
    const {Style1}=useContext(Context)
    return (
        <View style={{
            alignItems:"center",
            justifyContent:"center"
        }}>
            <TouchableOpacity onPress={()=>{
                navigation.pop()
            }} style={{
                position:"absolute",
                left:10,
                top:10
            }}>
                <FontAwesomeIcon icon={ faArrowLeft } style={{
                    padding:15,
                    color:Style1.color4
                }}/>
            </TouchableOpacity>
            <Text style={{
                color:Style1.color4,
                fontSize:40,
                fontWeight:"700",
                marginBottom:20
            }}>{text}</Text>
        </View>
    )
}
