import React, { useState } from 'react';
import { TouchableOpacity, Text, GestureResponderEvent, Button } from 'react-native';

interface Props {
  color?: string;
  width?: number;
  height?: number;
  title?: string;
  onClick?: (e: GestureResponderEvent) => void;
}

function CustomButton({color, width, height, title, onClick = () => {}}: Props) {

  return (
    <TouchableOpacity style={{width:width, height:height, backgroundColor:color}} onPress={e =>onClick(e)}>
    <Text>{title}</Text>
    </TouchableOpacity>
  )

}

export default CustomButton;