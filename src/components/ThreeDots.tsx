import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import Dots from '../../resources/icon/Dots';

function ThreeDots() {
  const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
  const [op, setOp] = useState(new Animated.Value(1));
  const handleAnimation = () => {
    Animated.timing(rotateAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      rotateAnimation.setValue(1);
    });
  };
  const handleAnimation2 = () => {
    animatedValue.setValue(10);
    Animated.decay(animatedValue, {
      velocity: 0.05,
      deceleration: 0.998,
      useNativeDriver: true,
    }).start();
  };
  const animatedStyle = {
    transform: [
      {
        rotate: rotateAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ['90deg', '270deg'],
        }),
      },
    ],
  };
  const moveStyle = {
    transform: [
      {
        translateY: animatedValue,
      },
    ],
  };

  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <Animated.View style={moveStyle}>
          <Text>A</Text>
        </Animated.View>
        <TouchableWithoutFeedback
          onPress={async () => {
            handleAnimation();
            handleAnimation2();
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
