import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const StyledFloatingButton = (props: any) => (
  <Svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle cx="40" cy="37" r="30" fill="#A055FF" />
    <Path
      d="M49.675 31.491C50.1083 31.0578 50.1083 30.3356 49.675 29.9246L47.0754 27.325C46.6644 26.8917 45.9422 26.8917 45.509 27.325L43.4648 29.358L47.6309 33.5241L49.675 31.491ZM30 42.8339V47H34.1661L46.4533 34.7017L42.2872 30.5356L30 42.8339Z"
      fill="white"
    />
  </Svg>
);
const FloatingWriteButton = ({onPress}: any) => {
  return (
    <TouchableOpacity
      hitSlop={{top: 20, right: 20, left: 20, bottom: 20}}
      activeOpacity={0.5}
      onPress={onPress}
      style={styles.touchableOpacityStyle}
      hitSlop={{top: 20, bottom: 20, right: 20, left: 20}}>
      <View style={styles.floatingButtonStyle}>
        <Text>
          <StyledFloatingButton />
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FloatingWriteButton;

const styles = StyleSheet.create({
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 50,
    bottom: 50,
    zIndex: 9999,
  },

  floatingButtonStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
