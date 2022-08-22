import React, {useRef} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Dimensions,
  Image,
  Animated,
  PanResponder
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const LabScreen = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        Animated.spring(pan, {toValue: {x: 0, y: 0}}).start();
      },
    }),
  ).current;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text
          style={{
            color: '#6E7882',
            fontSize: 15,
            fontFamily: 'SpoqaHanSansNeo-Regular',
            textAlign: 'center',
            lineHeight: 22.5,
            marginTop: 20,
          }}>
          두근두근 수정광산 실험실!{'\n'}
          어떤 기능들이 준비되고 있을까요?
        </Text>
        <Animated.View
          style={{
            transform: [{translateX: pan.x}, {translateY: pan.y}],
          }}
          {...panResponder.panHandlers}>
          <Image
            style={{
              width: 150,
              height: 150,
            }}
            source={require('../../../../resources/images/Lab.png')}
          />
        </Animated.View>

        <Text
          style={{
            color: '#6E7882',
            fontSize: 15,
            fontFamily: 'SpoqaHanSansNeo-Regular',
            textAlign: 'center',
            lineHeight: 22.5,
            marginTop: 20,
          }}>
          저를 드래그 해주세요!
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LabScreen;
