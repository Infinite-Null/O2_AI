import {Image, Text, View} from "react-native";
import {useContext} from "react";
import Context from "../../Context/Context";

export const EachHistory = ({text}) => {
    const {Style1}=useContext(Context)
    function UpdatedText(text1){
        if(text1.length>60){
            return text1.slice(0,61)+" ..."
        }else{
            return text1
        }
    }
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
              paddingVertical:15,

          }}>
              <Image source={require("../../Assets/points.png")} style={{
                  height:20,
                  width:20
              }}/>
              <Text style={{
                  color:Style1.color1,
                  marginLeft:10,
                  paddingRight:10,
                  fontSize:17,
                  fontWeight:"400"
              }}>{UpdatedText(text)}</Text>
          </View>
        </View>
    )
}
