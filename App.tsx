import 'react-native-gesture-handler';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import Quiz from './screens/Quiz';
import Results from './screens/Results';
import FAQs from './screens/Faqs';
import About from './screens/About';
import Share from './screens/Share';
import Feedback from './screens/Feedback';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Brain Trainer"
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#0F172A',
          },
          headerTitleStyle: {
            color: 'white',
            fontFamily: 'Roboto',
          },
          drawerLabelStyle: {
            color: 'white',
            fontFamily: 'Roboto',
          },
          drawerStyle: {
            backgroundColor: '#0F172A',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }}>
        <Drawer.Screen name="Brain Trainer" component={MainStackNavigator} />
        <Drawer.Screen name="FAQs" component={FAQs} />
        <Drawer.Screen name="About" component={About} />
        <Drawer.Screen name="Share" component={Share} />
        <Drawer.Screen name="Feedback" component={Feedback} />
      </Drawer.Navigator>
      {/* Adding Toast component at the root level */}
      <Toast />
    </NavigationContainer>
  );
}

function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Results"
        component={Results}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FAQs"
        component={FAQs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
