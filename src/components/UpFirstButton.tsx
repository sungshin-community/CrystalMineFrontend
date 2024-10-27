import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {ForwardArrow} from '../../resources/icon/Arrow';

interface UpFirstButtonProps {
  onPress: () => void;
}

export default function UpFirstButton({onPress}: UpFirstButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={styles.touchableOpacityStyle}>
      <ForwardArrow />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchableOpacityStyle: {
    backgroundColor: '#ffffff',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    borderRadius: 30,
    position: 'absolute',
    right: 32,
    bottom: 110,
    shadowColor: '#4A4A4A',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});

// svg 크기 수정
// style 수정
