import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const OnboardingScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Onboarding Page!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OnboardingScreen;
