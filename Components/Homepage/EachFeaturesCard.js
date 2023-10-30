import {ImageBackground, Text, TouchableOpacity, View} from "react-native";
import {useContext} from "react";
import Context from "../../Context/Context";

export const EachFeaturesCard = ({image,navigation,name,navigate}) => {
    const {Style1} = useContext(Context)
    return (
        <TouchableOpacity onPress={()=>{
            navigation.navigate(navigate)
        }} style={{
            height:160,
            width:200,
            backgroundColor:"black",
            margin:10,
            borderRadius:10,
            overflow:"hidden",
            elevation:2
        }}>
            <ImageBackground source={image} style={{
                height:"100%",
            }}>
                <View style={{
                    alignItems:"flex-start",
                    justifyContent:"flex-end",
                    backgroundColor:"rgba(0,0,0,0.15)",
                    height:"100%",
                    width:"100%"
                }}>
                <Text style={{
                    backgroundColor:"rgba(0,0,0,0.55)",
                    padding:5,
                    paddingHorizontal:10,
                    marginLeft:10,
                    borderRadius:10,
                    marginBottom:10,
                    fontWeight:"bold",
                    color:"white"
                }}>
                    {name+" >"}
                </Text>
                </View>
            </ImageBackground>

        </TouchableOpacity>
    )
}
