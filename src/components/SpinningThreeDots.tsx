import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Pressable,
  Easing,
  TouchableHighlight,
} from 'react-native';
import Dots from '../../resources/icon/Dots';
interface Props {
  handleDefaultModeComponent?: any;
  isMine?: boolean;
  handleOptionModeIsMineComponent?: any;
  handleOptionModeIsNotMineComponent?: any;
}
function SpinningThreeDots({
  handleDefaultModeComponent,
  isMine,
  handleOptionModeIsMineComponent,
  handleOptionModeIsNotMineComponent
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
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 0, margin: 0}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {!isOptionState && handleDefaultModeComponent}
          {isOptionState &&
            (isMine ? (
              handleOptionModeIsMineComponent
            ) : (
              handleOptionModeIsNotMineComponent
            ))}
        </View>
        <View style={{flexDirection: 'row'}}>
          <Pressable
            // style={{width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}
            // underlayColor='#EEEEEE'
            onPress={() => {
              handleAnimation();
              setIsOptionState(!isOptionState);
            }}>
            <Animated.View style={animatedStyle}>
              <Dots />
            </Animated.View>
          </Pressable>
        </View>
      </View>
    </>
  );
}

export default SpinningThreeDots;
