import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const ProfileCompleteScreen = ({navigation}) => {
  const navigateToCrystalBall = () => {
    navigation.navigate('CrystalBall'); // 수정구 화면으로 이동
  };
  return (
    <TouchableOpacity style={styles.container} onPress={navigateToCrystalBall}>
      <Image
        source={require('../../../resources/images/WelcomeBackground.png')}
        style={styles.backgroundImage}
      />
      <View style={styles.contentContainer}>
        <Image
          source={require('../../../resources/images/checkIcon.png')}
          style={styles.icon}
        />
        <Text style={styles.welcomeText}>수정구에 오신 걸</Text>
        <Text style={styles.welcomeText}>환영해요!</Text>
        <Text style={styles.descriptionText}>
          설정한 프로필은 MY에서 언제든 바꿀 수 있어요!
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#6E7882',
  },
});

export default ProfileCompleteScreen;
