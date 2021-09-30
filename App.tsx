// import SignUpID from "./src/screens/signUp/SignUpID";
// export default SignUpID;

// import TermAgree from "./src/screens/signUp/TermAgree";
// export default TermAgree;

import SignUpNickname from "./src/screens/signUp/SignUpNickname";
export default SignUpNickname;

// import React, {useEffect} from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import TermAgree from './src/screens/signUp/TermAgree';
// import Home from './src/screens/Home';
// import SplashScreen from 'react-native-splash-screen';
// import {StatusBar} from 'react-native';
// import TestPage from './src/screens/TestPage';
// import TestPage2 from './src/screens/TestPage2';
// import SignIn from './src/screens/signIn/SignIn';

// const Stack = createNativeStackNavigator();

// const App = () => {
//   StatusBar.setBackgroundColor('white');
//   // StatusBar.setTranslucent(true);
//   StatusBar.setBarStyle('dark-content');

//   // useEffect(() => {
//   //   SplashScreen.hide();
//   // }, []);

//   useEffect(() => {
//     setTimeout(() => {
//       SplashScreen.hide();
//     }, 1000);
//   }, []);

//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{headerShadowVisible: false}}>
//         <Stack.Screen
//           name="Home"
//           component={Home}
//           options={{title: ''}} />
//         <Stack.Screen
//           name="TermAgree"
//           component={TermAgree}
//           options={{title: ''}}
//         />
//         <Stack.Screen
//           name="TestPage"
//           component={TestPage}
//           options={{title: ''}}
//         />
//         <Stack.Screen
//           name="TestPage2"
//           component={TestPage2}
//           options={{title: ''}}
//         />
//         <Stack.Screen
//           name="SignIn"
//           component={SignIn}
//           options={{title: ''}}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };
// export default App;
