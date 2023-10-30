import Context from "./Context";
import {useEffect, useState} from "react";



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
    useEffect(()=>{
        console.log(History)
    },[History])
    return <Context.Provider value={{Style1,darkMode,setDarkmode,History,setHistory}}>
        {props.children}
    </Context.Provider>
}

export default  ContextState





