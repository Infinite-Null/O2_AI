import Onboarding from 'react-native-onboarding-swiper';
import {Image} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
            skipToPage={3}
            titleStyles={{
                fontSize:30
            }}
            onDone={async ()=>{
                await AsyncStorage.setItem('On', "T");
                navigation.replace("HomePage")
            }}
            pages={[
                {
                    backgroundColor: '#045d8d',
                    image: <Image source={require('../Assets/logo.jpg')} style={{
                        height:200,
                        width:200,
                        borderRadius:10
                    }}/>,
                    title: 'Welcome to O2.Ai',
                    subtitle: 'Your personal Ai assistant',
                },
                {
                    backgroundColor: '#257e54',
                    image: <Image source={require('../Assets/mail.gif')} style={{
                        height:200,
                        width:200,
                        borderRadius:1500
                    }}/>,
                    title: 'Mail Generation',
                    subtitle: 'Generate professional mails with just one tap',
                },
                {
                    backgroundColor: '#709f87',
                    image: <Image source={require('../Assets/code.gif')} style={{
                        height:200,
                        width:200,
                        borderRadius:1500
                    }}/>,
                    title: 'Code Generation',
                    subtitle: 'A professional coder at your finger tip.',
                },
                {
                    backgroundColor: '#333380',
                    title: 'Let\'s Go !',
                    subtitle:""
                },
            ]}
        />
    )
}
