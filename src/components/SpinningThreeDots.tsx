import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Pressable,
  Easing,
} from 'react-native';
import Dots from '../../resources/icon/Dots';
import Siren from '../../resources/icon/Siren';
interface Props {
  isScrap?: boolean;
  isMine: boolean;
  handleScrapComponent?: any;
  handleDeleteComponent: any;
}
function SpinningThreeDots({
  isScrap = false,
  isMine,
  handleScrapComponent,
  handleDeleteComponent,
}: Props) {
  const [isOptionState, setIsOptionState] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const rotateAnimation= useRef(new Animated.Value(0)).current;
  const handleAnimation = () => {
  if(!isOptionState)
    Animated.timing(rotateAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setToggle((prev)=>!prev)
    });
  else
    Animated.timing(rotateAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setToggle((prev)=>!prev)
    });
  }
  const animatedStyle = {
    transform: [
      {
        rotate: rotateAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '90deg'],
        }),
      },
    ],
  };

  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {!isOptionState && isScrap && handleScrapComponent}
          {isOptionState &&
            (isMine ? (
              handleDeleteComponent
            ) : (
              <Siren style={{marginRight: 14}} />
            ))}
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableWithoutFeedback
            onPress={() => {
              handleAnimation();
              setIsOptionState(!isOptionState);
            }}>
            <Animated.View style={animatedStyle}>
              <Dots />
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </>
  );
}

export default SpinningThreeDots;
