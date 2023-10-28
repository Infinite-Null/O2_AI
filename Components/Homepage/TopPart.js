import {Text, View} from "react-native";
import {useContext} from "react";
import Context from "../../Context/Context";

export const TopPart = () => {
    return (
        <View style={{
            height:160,
            alignItems:"center",
            justifyContent:"center"
        }}>
            <Text style={{
                color:"white",
                textAlign:"center",
                fontSize:40,
                fontWeight:'bold',
            }}>Hi, I am O2</Text>
            <Text style={{
                color:"white",
                textAlign:"center",
                fontSize:18,
                fontWeight:'200',
            }}>How may I help you today?</Text>
        </View>
    )
}
