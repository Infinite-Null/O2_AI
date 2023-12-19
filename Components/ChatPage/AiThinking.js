import {useContext, useState} from "react";
import Context from "../../Context/Context";
import {Clipboard, Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCopy, faRobot} from "@fortawesome/free-solid-svg-icons";
import TypeWriter from "react-native-typewriter";

export const AiThinking = () => {
    const [random,setRandom]=useState(Math.floor(Math.random() * 7))
    const Dailogs = [
        "Thinking...💭",
        "Till I am thinking your answer, Did you know:\nPeater Parker is Spiderman🕸️",
        "While I am thinking, Do you know:\n\"The Eiffel Tower can be 15 cm taller during the summer🧠\"",
        "Your response is on the route...🚗",
        "Your answer is on the way, Till the time here is a fun fact:\n\"Scotland's national animal is unicorn!🫏\"",
        "Spinning the hamster wheel of progress...🐭",
        "Riding the waves of data...👩‍💻"
    ]
    const [writing,setWriting]=useState(1)
    return (
        <View style={{
            backgroundColor:Style1.color5,
            elevation:1,
            marginVertical:10
        }}>
            <View style={{
                paddingHorizontal:10,
                paddingTop:10,
                flexDirection:"row",
                alignItems:"center",
            }}>
                <FontAwesomeIcon icon={ faRobot } style={{
                    padding:10,
                    color:Style1.color2
                }}/>
                <Text style={{
                    color:Style1.color2,
                    fontSize:17,
                    paddingLeft:5
                }}>Thinking...</Text>
            </View>
            <View style={{
                padding:15,
                paddingTop:2,
                paddingLeft:27,
                marginTop:3,
                fontSize:17,
            }}>
                <TypeWriter minDelay={1} maxDelay={1} typing={writing} style={{
                    color:Style1.color4
                }} onTypingEnd={()=>{
                    if(writing===-1){
                        setRandom(Math.floor(Math.random() * 7))
                        setTimeout(()=>{
                            setWriting(1)
                        },1000)

                    }else {
                        setTimeout(()=>{
                            setWriting(-1)
                        },5000)
                    }
                }}>{Dailogs[random]}</TypeWriter>
            </View>

        </View>
    )
}
