import {Text} from "react-native";
import {useContext} from "react";
import Context from "../../Context/Context";

export const Heading = ({title}) => {
    const {Style1} = useContext(Context)
    return (
        <Text style={{
            color:Style1.color4,
            fontSize:25,
            fontWeight:"600",
            paddingLeft:20,
            paddingTop:20
        }}>{title}</Text>
    )
}
