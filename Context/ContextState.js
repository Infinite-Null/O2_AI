import Context from "./Context";



const ContextState=(props)=>{
    const Style1={
        color1:"#dbe4f3",
        color2:"#769bea",
        color3:"#282828",
        color4:"white",
        color5:"#1f1f1f",
    color6:"gray"
    }
    // const Style1={
    //     color1:"#03142a",
    //     color2:"#4a7feb",
    //     color3:"#f6f6f6",
    //     color4:"black",
    //     color5:"white",
    //     color6:"gray"
    // }
    return <Context.Provider value={{Style1}}>
        {props.children}
    </Context.Provider>
}

export default  ContextState





