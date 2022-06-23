import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import Dots from '../../resources/icon/Dots';
import Siren from '../../resources/icon/Siren';
interface Props {
  isScrap?: boolean;
  isMine: boolean;
  handleScrapComponent?: any;
  handleDeleteComponent: any
}
function SpinningThreeDots({isScrap = false, isMine, handleScrapComponent, handleDeleteComponent}: Props) {
  const [isOptionState, setIsOptionState] = useState<boolean>(false);
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
          outputRange: ['180deg', '0deg'],
        }),
      },
    ],
  };

  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {!isOptionState && isScrap && (
           handleScrapComponent
          )}
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
