import React from 'react';
import {BigOneLineText, BigTwoLineText, NormalOneLineText, Description} from './src/components/top';

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


const App = () => {
    StatusBar.setBackgroundColor("white");
    // StatusBar.setTranslucent(true);
    StatusBar.setBarStyle('dark-content');
    
return (
    <SafeAreaView>
        <Text>수정광산</Text>
    </SafeAreaView>
    );
};
export default App;
