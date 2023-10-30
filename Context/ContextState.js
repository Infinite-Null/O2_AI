import Context from "./Context";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";



const ContextState=(props)=>{
    const [darkMode,setDarkmode]=useState(false)
    const [Style1,setStyle]=useState({
        color1:"#03142a",
        color2:"#4a7feb",
        color3:"#f6f6f6",
        color4:"black",
        color5:"white",
        color6:"gray"
    })
    useEffect(() => {
        if(darkMode){
            setStyle({
                color1:"#dbe4f3",
                color2:"#769bea",
                color3:"#282828",
                color4:"white",
                color5:"#1f1f1f",
                color6:"gray"
            })
        }else{
            setStyle({
                color1:"#03142a",
                color2:"#4a7feb",
                color3:"#f6f6f6",
                color4:"black",
                color5:"white",
                color6:"gray"
            })
        }
    }, [darkMode]);
    const [History,setHistory] = useState([])
    async function SaveDarkMode(value){
        try {
            await AsyncStorage.setItem('dark', value);
        } catch (e) {
            // saving error
        }
    }
    const GetDarkMode = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('dark');
            if (jsonValue===null){
                setDarkmode(false)
            }else{
                if(jsonValue==='D'){
                    setDarkmode(true)
                }else{
                    setDarkmode(false)
                }

            }
        } catch (e) {
            // error reading value
        }
    };
    async function SaveData(){
        try {
            const jsonValue = JSON.stringify(History);
            await AsyncStorage.setItem('history', jsonValue);
        } catch (e) {
            // saving error
        }
    }
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('history');
            jsonValue != null ? JSON.parse(jsonValue) : null;
            if (jsonValue===null){
                setHistory([])
            }else{
                setHistory(JSON.parse(jsonValue))
            }
        } catch (e) {
            // error reading value
        }
    };
    useEffect(()=>{
        if(History.length!==0){
             SaveData()
        }
        // const History1=History
        // setHistory(JSON.parse(History1))
    },[History])
    useEffect( () => {
        getData()
        GetDarkMode()
    }, []);
    return <Context.Provider value={{Style1,darkMode,setDarkmode,History,setHistory,SaveData,getData,SaveDarkMode,GetDarkMode}}>
        {props.children}
    </Context.Provider>
}

export default  ContextState





