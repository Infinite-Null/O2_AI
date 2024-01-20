/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {HomePage} from './Screens/HomePage';
import ContextState from './Context/ContextState';
import {ChatPage} from './Screens/ChatPage';
import {MailPage} from './Screens/MailPage';
import {CodePage} from './Screens/CodePage';
import {ToastProvider} from 'react-native-toast-notifications';
import {OnboardingScreen} from './Screens/OnboardingScreen';
import {Initial} from './Screens/Initial';
import {EsseyPage} from './Screens/EsseyPage';
import {PlagiarismPage} from './Screens/Plagiarism';
import Features from "./Screens/Features";
import ImageChat from "./Screens/ImageChat";

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <ToastProvider>
      <ContextState>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={'Initial'}>
            <Stack.Screen
              name={'Initial'}
              component={Initial}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={'Onboarding'}
              component={OnboardingScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={'HomePage'}
              component={HomePage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={'ChatPage'}
              component={ChatPage}
              options={{
                headerShown: false,
              }}
            />
              <Stack.Screen
                  name={'ImageChat'}
                  component={ImageChat}
                  options={{
                      headerShown: false,
                  }}
              />
              <Stack.Screen
                  name={'FeaturesPage'}
                  component={Features}
                  options={{
                      headerShown: false,
                  }}
              />
            <Stack.Screen
              name={'MailPage'}
              component={MailPage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={'EsseyPage'}
              component={EsseyPage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={'PlagiarismPage'}
              component={PlagiarismPage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name={'CodePage'}
              component={CodePage}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ContextState>
    </ToastProvider>
  );
}

export default App;
