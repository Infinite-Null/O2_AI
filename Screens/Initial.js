import AsyncStorage from "@react-native-async-storage/async-storage";
import {useContext, useEffect} from "react";
import {View} from "react-native";
import Context from "../Context/Context";

export const Initial = ({navigation}) => {
    const {Style1}=useContext(Context)
    async function Get(){
        const val=await AsyncStorage.getItem('On');
        console.log(val)
        if(val==='T'){
            navigation.replace('HomePage')

        }else{
            navigation.replace('Onboarding')
        }
    }
    useEffect(() => {
        Get()
    }, []);
    return (
        <View style={{
            backgroundColor:"black",
            flex:1
        }}></View>
    )
}
