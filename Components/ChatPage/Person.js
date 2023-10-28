import {Image, Text, View} from "react-native";
import {useContext} from "react";
import Context from "../../Context/Context";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

export const Person = ({text}) => {
    const{Style1}=useContext(Context)
    return (
        <View style={{
            marginVertical:10
        }}>
            <View style={{
                paddingHorizontal:10,
                paddingTop:10,
                flexDirection:"row",
                alignItems:"center",
            }}>
                <FontAwesomeIcon icon={ faUser } style={{
                    padding:10,
                    color:Style1.color1
                }}/>
                <Text style={{
                    color:Style1.color1,
                    fontSize:17,
                    paddingLeft:5
                }}>You</Text>
            </View>
            <Text selectable={true} style={{
                color:Style1.color4,
                padding:15,
                paddingTop:2,
                paddingLeft:27,
                marginTop:3,
                fontSize:17,
            }}>{text}</Text>

        </View>
       )
}
