
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import {HomePage} from "./Screens/HomePage";
import ContextState from "./Context/ContextState";
import {ChatPage} from "./Screens/ChatPage";
import {MailPage} from "./Screens/MailPage";
import {CodePage} from "./Screens/CodePage";
import {ToastProvider} from "react-native-toast-notifications";


function App(): JSX.Element {

  const Stack = createNativeStackNavigator()


  return (<ToastProvider>
      <ContextState>
      <NavigationContainer>
        <Stack.Navigator>
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
