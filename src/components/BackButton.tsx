import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import BackButtonIcon from '../../resources/icon/BackButtonIcon';

interface Props {
  onPress: () => void;
}

function BackButton({onPress}: Props) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <BackButtonIcon />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
  },
});

export default BackButton;
