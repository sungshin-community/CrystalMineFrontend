import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TermAgree from './src/screens/signUp/TermAgree';
import Home from './src/screens/Home';
import {StatusBar} from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  StatusBar.setBackgroundColor('white');
  // StatusBar.setTranslucent(true);
  StatusBar.setBarStyle('dark-content');

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{title: ''}} />
        <Stack.Screen
          name="Profile"
          component={TermAgree}
          options={{title: ''}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
