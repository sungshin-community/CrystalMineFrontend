import * as React from 'react';
import Svg, { SvgProps, G, Circle, Path, Defs } from "react-native-svg"
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const StyledFloatingButton = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={62}
    height={62}
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <Circle cx={31} cy={31} r={24} fill="#A055FF" />
    </G>
    <Path
      fill="#fff"
      d="M38.74 26.593c.347-.347.347-.924 0-1.253l-2.08-2.08c-.328-.347-.906-.347-1.253 0l-1.635 1.626 3.333 3.333 1.635-1.626zM23 35.667V39h3.333l9.83-9.839-3.333-3.333-9.83 9.84z"
    />
    <Defs></Defs>
  </Svg>
);
const FloatingWriteButton = ({onPress}: any) => {
  return (
    <TouchableOpacity
      hitSlop={{top: 20, right: 20, left: 20, bottom: 20}}
      activeOpacity={0.5}
      onPress={onPress}
      style={styles.touchableOpacityStyle}>
      <StyledFloatingButton />
    </TouchableOpacity>
  );
};

export default FloatingWriteButton;

const styles = StyleSheet.create({
  touchableOpacityStyle: {
    width: 48,
    height: 48,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    zIndex: 9999,
    backgroundColor: '#A055FF',  // 추가
    borderRadius: 24,           // 추가
    // iOS
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    // Android
    elevation: 5,
  },
});
