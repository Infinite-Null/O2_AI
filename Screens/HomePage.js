import {Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useContext} from "react";
import Context from "../Context/Context";
import {EachFeaturesCard} from "../Components/Homepage/EachFeaturesCard";
import {Heading} from "../Components/Global/Heading";
import {TopPart} from "../Components/Homepage/TopPart";
import {EachHistory} from "../Components/Homepage/EachHistory";

export const HomePage = ({navigation}) => {
    const {Style1}=useContext(Context)
    return (
            <ImageBackground source={require("../Assets/artem-bryzgalov-r2CAjGQ0gSI-unsplash.jpg")} style={{flex:1,height:"100%",width:"100"}}>
                <View style={{
                    flex:1,
                    backgroundColor:"rgba(0,0,0,0.37)"
                }}>

                    <TopPart/>
                    <View style={{
                        backgroundColor:Style1.color3,
                        flex:1,
                        borderTopLeftRadius:20,
                        borderTopRightRadius:20
                    }}>
                    <ScrollView style={{marginTop:5}}>
                        <Heading title={"Features"}/>
                        <ScrollView horizontal={true} contentContainerStyle={{
                            paddingLeft:15
                        }}>
                            <EachFeaturesCard navigation={navigation} image={require("../Assets/kate-macate-xmddEHyCisc-unsplash.jpg")} name={"Generate Mail"} navigate={"MailPage"}/>
                            <EachFeaturesCard navigation={navigation} image={require("../Assets/christopher-gower-m_HRfLhgABo-unsplash.jpg")} name={"Generate Code"} navigate={"CodePage"}/>
                        </ScrollView>
                        <Heading title={"Chat history"}/>
                        <EachHistory/>
                        <EachHistory/>
                        <EachHistory/>
                    </ScrollView>
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate("ChatPage")
                    }}  style={{
                        paddingHorizontal:10,
                        backgroundColor:Style1.color5,
                        flexDirection:"row",
                        height:70,
                        alignItems:"center",
                        justifyContent:"center"
                    }}>
                        <TouchableOpacity  onPress={()=>{
                            navigation.navigate("ChatPage")
                        }} style={{
                            backgroundColor:Style1.color5,
                            fontSize:15,
                            color:Style1.color4,
                            flex:1
                        }}>
                            <Text style={{
                                color:Style1.color4,
                                paddingLeft:14
                            }}>Ask anything...</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            height:"100%",
                            alignItems:"center",
                            justifyContent:"center"
                        }}>
                            <Image source={require("../Assets/send.png")} style={{
                                height:50,
                                width:30,
                                objectFit:"contain"
                            }}/>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
    )
}
