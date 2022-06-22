import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import Dots from '../../resources/icon/Dots';
import {NoScrap} from '../../resources/icon/Scrap';
import TrashIcon from '../../resources/icon/TrashIcon';
import Siren from '../../resources/icon/Siren';
interface Props {
  defaultIcon?: any;
  isMine: boolean;
}
function SpinningThreeDots({defaultIcon, isMine}: Props) {
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
          {!isOptionState && defaultIcon}
          {isOptionState &&
            (isMine ? (
              <TrashIcon style={{marginRight: 5}} />
            ) : (
              <Siren style={{marginRight: 5}} />
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
