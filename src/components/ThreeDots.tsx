import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import Dots from '../../resources/icon/Dots';
import { NoScrap } from '../../resources/icon/Scrap';

function ThreeDots(icons: any) {
  const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));
  const handleAnimation = () => {
    Animated.timing(rotateAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      rotateAnimation.setValue(1);
    });
  };
  
  const animatedStyle = {
    transform: [
      {
        rotate: rotateAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };


  return (
    <>
      <View style={{flexDirection: 'row'}}>
        {icons[0]}
        <TouchableWithoutFeedback
          onPress={async () => {
            handleAnimation();
           
          }}>
          <Animated.View style={animatedStyle}>
            <Dots />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}

export default ThreeDots;
