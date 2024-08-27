/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

interface Props {
  navigation: any;
}

const CrystalBallOnboading: React.FC<Props> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../resources/images/CrystalOnboadingImg.png')}
        style={styles.image}npx react-native run-android
      />
      <Text>WELCOME!</Text>
      <Text>궁금했던, 궁금한, 궁금할 모든 것.</Text>
      <Text>수정구에 물어봐!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default CrystalBallOnboading;
