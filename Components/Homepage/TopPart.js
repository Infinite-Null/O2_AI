import {Text, View} from "react-native";
import {useContext} from "react";
import Context from "../../Context/Context";

export const TopPart = () => {
    const {Style1}=useContext(Context)
    return (
        <View style={{
            height:200,
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
