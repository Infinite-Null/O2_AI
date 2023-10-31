import { Text, TouchableOpacity, View} from "react-native";
import {useContext, useState} from "react";
import Context from "../../Context/Context";

export const HeadingHistory = ({title}) => {
    const {Style1,History,setHistory,SaveData} = useContext(Context)
    const [show,setShow]=useState(false)
    return (
       <View style={{
           flexDirection:"row",
           justifyContent:"space-between",
           alignItems:"center",
           paddingTop:20,
           paddingHorizontal:20,
           marginBottom:10
       }}>
           <Text style={{
               color:Style1.color4,
               fontSize:25,
               fontWeight:"600",
           }}>{title}</Text>
           <TouchableOpacity onPress={()=>{
               setShow(true)
           }} style={{
               borderColor:Style1.color2,
               borderWidth:1,
               padding:5,
               borderRadius:10,
           }}>
                <Text style={{
                    color:Style1.color2,
                    fontWeight:"500"
                }}>Clear</Text>
           </TouchableOpacity>
           {show&&<View style={{
               height:100,
               position:"absolute",
               width:200,
               backgroundColor:Style1.color5,
               zIndex:100,
               right:25,
               top:-84,
               borderRadius:10,
               elevation:5,
               padding:10,
               justifyContent:"space-between",
           }}>
               <Text style={{
                   fontSize:17,
                   fontWeight:"500",
                   color:Style1.color4
               }}>Are you sure you want to clear chat history?</Text>
               <View style={{
                   flexDirection:"row",
                   alignItems:"center",
                   justifyContent:"space-between"
               }}>
                   <TouchableOpacity onPress={()=>{
                       setShow(false)
                   }} style={{
                       borderRadius:10,
                       borderWidth:1,
                       borderColor:Style1.color2,
                       padding:5
                   }}>
                       <Text style={{
                           color:Style1.color2
                       }}>Cancel</Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=>{
                       setShow(false)
                       setHistory([])
                       SaveData()
                   }} style={{
                       borderRadius:10,
                       backgroundColor:"rgb(234,114,114)",
                       paddingHorizontal:15,
                       paddingVertical:5,
                   }}>
                       <Text style={{
                           color:Style1.color3
                       }}>Yes</Text>
                   </TouchableOpacity>
               </View>
           </View>}
       </View>
    )
}
