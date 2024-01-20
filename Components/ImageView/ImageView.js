import {Button, Image, Modal, Text} from "react-native";
import Dialog from "react-native-dialog";
import {memo} from "react";

function ImageView({visible, setvisible,image}) {
    return <Dialog.Container contentStyle={{
        backgroundColor:'#1e1b38',
    }} onBackdropPress={()=>{
        setvisible(false)
    }} visible={visible} style={{
        backgroundColor:'#1e1b38',
        padding:0,
        margin:0
    }}>
        {image.length !== 0 && <Image source={{
            uri:image[0]?.uri??''
        }} style={{
            height:300,
            width:300,
        }}/>}
        {image.length === 0 && <Text style={{
            color:'white',
            textAlign:'center',
            paddingBottom:10
        }}>No image selected</Text>}
        <Button title={'Close'} onPress={()=>{setvisible(false)}}/>
    </Dialog.Container>
}
export default memo(ImageView)