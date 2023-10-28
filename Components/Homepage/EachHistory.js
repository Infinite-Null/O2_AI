import {Image, Text, View} from "react-native";
import {useContext} from "react";
import Context from "../../Context/Context";

export const EachHistory = () => {
    const {Style1}=useContext(Context)
    return (
        <View style={{
            paddingHorizontal:5,
            marginHorizontal:20,
            marginVertical:5,
        }}>
          <View style={{
              flexDirection:"row",
              alignItems:"center",
              backgroundColor:Style1.color5,
              padding:10,
              borderRadius:10,
              paddingVertical:15
          }}>
              <Image source={require("../../Assets/points.png")} style={{
                  height:20,
                  width:20
              }}/>
              <Text style={{
                  color:Style1.color1,
                  paddingRight:30,
                  marginLeft:10,
                  fontSize:17,
                  fontWeight:"400"
              }}>How to develop a law firm website in a way that convey trust and authority</Text>
          </View>
        </View>
    )
}
