import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  Animated,
  PanResponder,
} from 'react-native';
import AdMob from '../../../components/AdMob';
import MessageTabIcon from '../../../../resources/icon/MessageTabIcon';

const LabScreen = () => {
  const [time, setTime] = useState<number>(0);

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
        }).start();
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
          }}>
          두근두근 수정광산 실험실!{'\n'}
          어떤 기능들이 준비되고 있을까요?
        </Text>
        <Animated.View
          style={{
            transform: [{translateX: pan.x}, {translateY: pan.y}],
            zIndex: 10,
          }}
          onTouchEnd={() => setTime(time + 1)}
          {...panResponder.panHandlers}>
          <Image
            style={{
              width: 150,
              height: 150,
            }}
            source={require('../../../../resources/images/Lab.png')}
          />
        </Animated.View>
        {time === 10 && (
          <View
            style={{
              marginTop: -80,
              marginBottom: 11,
              alignItems: 'center',
              opacity: 0.4,
            }}>
            <MessageTabIcon color={'#E5D2FC'} />
            <Text
              style={{
                color: '#6E7882',
                fontSize: 12,
                fontFamily: 'SpoqaHanSansNeo-Regular',
                textAlign: 'center',
              }}>
              쉿! {'\n'}수정이랑 개발팀만의{'\n'}비밀이야...!
            </Text>
          </View>
        )}
        <Text
          style={{
            color: '#6E7882',
            fontSize: 15,
            fontFamily: 'SpoqaHanSansNeo-Regular',
            textAlign: 'center',
            lineHeight: 22.5,
            marginTop: 10,
            marginBottom: 20,
          }}>
          저를 드래그 해주세요!
        </Text>
        <AdMob />
        <Text
          style={{
            color: '#6E7882',
            fontSize: 14,
            fontFamily: 'SpoqaHanSansNeo-Regular',
            textAlign: 'center',
            lineHeight: 22.5,
          }}>
          광고를 준비하고 있어요! {'\n'}그 다음 기능은...?!
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LabScreen;
