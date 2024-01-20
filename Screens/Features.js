import {Dimensions, ScrollView, Text, View} from "react-native";
import React from "react";
import {EachCard} from "./HomePage";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Features({navigation}) {
    return <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{
            height: windowHeight,
            backgroundColor: '#1e1b38',
            paddingHorizontal: windowWidth * 0.045,
            paddingTop: 10,
        }}
        contentContainerStyle={{
            paddingBottom: 100,
        }}>
        <Text
            style={{
                color: 'white',
                fontSize: windowWidth * 0.07,
                fontWeight: 'bold',
                alignSelf: 'flex-start',
                marginTop: 10,
                marginBottom:10
            }}>
            All Features
        </Text>
        <View
            style={{
                flexDirection: 'row',
                gap: 20,
            }}>
            <EachCard
                delay={0}
                title={'MAIL'}
                discreption={'Generate professional mail in one tap.'}
                image={require('../Assets/mail.png')}
                color={'rgba(33, 64, 133, 0.30)'}
                navigation={navigation}
                route={'MailPage'}
            />
            <EachCard
                delay={150}
                title={'CODE'}
                discreption={'Generate error free code in one tap.'}
                image={require('../Assets/webpage.png')}
                color={'rgba(146, 97, 32, 0.25)'}
                navigation={navigation}
                route={'CodePage'}
            />
        </View>
        <View
            style={{
                flexDirection: 'row',
                gap: 20,
                marginTop: 20,
            }}>
            <EachCard
                delay={250}
                title={'Image'}
                discreption={'Chat with image in one tap.'}
                image={require('../Assets/Image.png')}
                color={'rgba(48,136,99,0.18)'}
                navigation={navigation}
                route={'ImageChat'}
            />
            <EachCard
                delay={350}
                title={'PLAGIARISM'}
                discreption={'Remove plagiarism in one tap.'}
                image={require('../Assets/ai.png')}
                color={'#2c2250'}
                route={'PlagiarismPage'}
                navigation={navigation}
            />
        </View>
        <View
            style={{
                flexDirection: 'row',
                gap: 20,
                marginTop: 20,
            }}>
        <EachCard
            delay={450}
            title={'ESSAY'}
            discreption={'Generate essay on any topic in one tap.'}
            image={require('../Assets/Essey.png')}
            color={'rgba(136, 48, 48, 0.18)'}
            navigation={navigation}
            route={'EsseyPage'}
        />
          <View style={{
              flex: 1,
              borderRadius: 10,
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 20,
          }}>
          </View>
        </View>
    </ScrollView>
}