import React from 'react';
import {BigOneLineText, BigTwoLineText, NormalOneLineText, Description} from './src/components/top';
import { PurpleRoundButton, WhiteRoundButton } from './src/components/Button';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TermAgree from './src/screens/TermAgree';
import Home from './src/screens/Home';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Button,
    Text,
    useColorScheme,
    View,
} from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
    StatusBar.setBackgroundColor("white");
    // StatusBar.setTranslucent(true);
    StatusBar.setBarStyle('dark-content');

    
return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: '' }}
        />
        <Stack.Screen name="Profile" component={TermAgree} options={{ title: '' }} />
      </Stack.Navigator>
    </NavigationContainer>
    );
};
export default App;