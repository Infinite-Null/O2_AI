
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createNavigationContainerRef, NavigationContainer} from "@react-navigation/native";
import {HomePage} from "./Screens/HomePage";
import ContextState from "./Context/ContextState";
import {ChatPage} from "./Screens/ChatPage";
import {MailPage} from "./Screens/MailPage";
import {CodePage} from "./Screens/CodePage";
import {ToastProvider} from "react-native-toast-notifications";
import {HistoryChatPage} from "./Screens/HistoryChatPage";
import {OnboardingScreen} from "./Screens/OnboardingScreen";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Initial} from "./Screens/Initial";


function App(): JSX.Element {
  const Stack = createNativeStackNavigator()
  return (<ToastProvider>
      <ContextState>
      <NavigationContainer >
        <Stack.Navigator initialRouteName={'Initial'}>
          <Stack.Screen name={"Initial"} component={Initial} options={{
            headerShown:false
          }}/>
          <Stack.Screen name={"Onboarding"} component={OnboardingScreen} options={{
            headerShown:false
          }}/>
          <Stack.Screen name={"HomePage"} component={HomePage} options={{
            headerShown:false
          }}/>
          <Stack.Screen name={"ChatPage"} component={ChatPage} options={{
            headerShown:false
          }}/>
          <Stack.Screen name={"MailPage"} component={MailPage} options={{
            headerShown:false
          }}/>
          <Stack.Screen name={"CodePage"} component={CodePage} options={{
            headerShown:false
          }}/>
        </Stack.Navigator>
      </NavigationContainer>
  </ContextState></ToastProvider>
  );
}

export default App;
