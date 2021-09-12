import React, { useState } from 'react';
import { TouchableOpacity, Text, GestureResponderEvent, Button, StyleSheet } from 'react-native';

interface Props {
  textColor?: string;
  style: Object;
  text?: string;
  onClick?: (e: GestureResponderEvent) => void;
}

function CustomButton({style,text, textColor, onClick = () => {}}: Props) {
  return (
    <TouchableOpacity style={[style, {justifyContent: 'center', alignItems: 'center'}]} onPress={e =>onClick(e)}>
      <Text style={{color: textColor}}>{text}</Text>
    </TouchableOpacity>
  )

}

export default CustomButton;