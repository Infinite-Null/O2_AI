import {Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useContext} from "react";
import Context from "../Context/Context";
import {EachFeaturesCard} from "../Components/Homepage/EachFeaturesCard";
import {Heading} from "../Components/Global/Heading";
import {TopPart} from "../Components/Homepage/TopPart";
import {EachHistory} from "../Components/Homepage/EachHistory";
import ToggleSwitch from "toggle-switch-react-native";

export const HomePage = ({navigation}) => {
    const {Style1,setDarkmode,darkMode,History,SaveDarkMode}=useContext(Context)
    return (
            <ImageBackground source={require("../Assets/artem-bryzgalov-r2CAjGQ0gSI-unsplash.jpg")} style={{flex:1,height:"100%",width:"100"}}>
                <View style={{
                    flex:1,
                    backgroundColor:"rgba(0,0,0,0.37)"
                }}>
                    <View style={{
                        alignItems:"flex-end",
                        paddingRight:10,
                        paddingTop:10,
                        marginTop:6,
                    }}>
                        <ToggleSwitch
                            isOn={darkMode}
                            onColor="green"
                            offColor="rgb(45,45,45)"
                            label={"Dark Mode"}
                            labelStyle={{ color: "white", fontWeight: "500" }}
                            size="medium"
                            onToggle={isOn => {
                                if(isOn===false){
                                    SaveDarkMode('L')
                                }else {
                                    SaveDarkMode("D")
                                }
                                setDarkmode(isOn)
                            }}
                        />
                    </View>

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
                        {History!=undefined&&History?.map((e,i)=>{
                            return <EachHistory text={e[1].message} key={i} data={e} navigation={navigation} index={i}/>
                        })}
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
                        <View style={{
                            height:40,
                            width:40,
                            borderRadius:100000,
                            overflow:"hidden",
                            marginRight:5,
                            justifyContent:"center",
                            alignItems:"center"
                        }}>
                            <Image source={require("../Assets/mic.png")} style={{
                                height:"70%",
                                width:"70%",
                                borderRadius:100000
                            }}/></View>
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
                        <View style={{
                            height:"100%",
                            alignItems:"center",
                            justifyContent:"center"
                        }}>
                            <Image source={require("../Assets/send.png")} style={{
                                height:50,
                                width:30,
                                objectFit:"contain"
                            }}/>
                        </View>
                    </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
    )
}
