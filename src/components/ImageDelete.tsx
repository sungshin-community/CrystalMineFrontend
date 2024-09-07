import React, {useEffect, useState} from 'react';
import {Image, View, StyleSheet, Button, Pressable} from 'react-native';
interface Props {
  imageUri: string;
  deleteImage: any;
}
export const ImageDelete = ({imageUri, deleteImage}: Props) => {
  return (
    <View style={{width: 75, height: 70, marginRight: 5, marginTop: 5}}>
      <Image source={{uri: imageUri}} style={styles.imageBox} />
      <Pressable
        onPress={() => deleteImage(imageUri)}
        style={{zIndex: 10, position: 'absolute', right: 0, top: -5}}
        hitSlop={20}>
        <DeleteImageIcon />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBox: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
  },
});

import Svg, {SvgProps, Circle, Path} from 'react-native-svg';

export const DeleteImageIcon = (props: SvgProps) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Circle cx={9} cy={9} r={9} fill="rgba(0, 0, 0, 0.8)" />
    <Path
      d="m13.083 5.739-.822-.822L9 8.177l-3.26-3.26-.823.822 3.26 3.26-3.26 3.262.822.822L9 9.823l3.26 3.26.823-.822L9.823 9l3.26-3.261Z"
      fill="#fff"
    />
  </Svg>
);

export default DeleteImageIcon;
