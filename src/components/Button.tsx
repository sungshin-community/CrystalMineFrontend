import React, { useState } from 'react';
import { TouchableOpacity, Text, GestureResponderEvent, Button, StyleSheet, Dimensions } from 'react-native';

interface Props {
  textStyle: Object;
  style: Object;
  text?: string;
  onClick?: (e: GestureResponderEvent) => void;
}

interface ButtonProps {
  text?: string;
  onClick?: (e: GestureResponderEvent) => void;
}

const style = StyleSheet.create({
  whiteText: {
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: 17
  },
  purpleText: {
    color: '#A055FF',
    fontWeight: '400',
    fontSize: 17
  },
  disabledPurpleText: {
    color: '#DDCBF5', fontWeight: '400', fontSize: 17 },
  purpleRoundButton: { backgroundColor: '#A055FF', width: 343, height: 56, borderRadius: 10 },
  whiteRoundButton: {
    backgroundColor: '#FFFFFF',
    width: 343,
    height: 56,
    borderRadius: 10,
    borderColor: '#A055FF',
    borderStyle: 'solid',
    borderWidth: 1
  },
  disabledPurpleRoundButton: {
    backgroundColor: '#E5D2FC',
    width: 343,
    height: 56,
    borderRadius: 10
  },
  disabledWhiteRoundButton: {
    backgroundColor: '#F5F5F5',
    width: 343,
    height: 56,
    borderRadius: 10,
    borderColor: '#DDCBF5',
    borderStyle: 'solid',
    borderWidth: 1
  },
  purpleFullButton: {
    backgroundColor: '#A055FF',
    width: Dimensions.get('window').width, height: 56
  },
  disabledPurpleFullButton: {
    backgroundColor: '#E5D2FC',
    width: Dimensions.get('window').width, height: 56
  }
});

function CustomButton({style,text, textStyle, onClick = () => {}}: Props) {
  return (
    <TouchableOpacity style={[style, {justifyContent: 'center', alignItems: 'center'}]} onPress={e =>onClick(e)}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  )
}

export const PurpleRoundButton = ({text, onClick = () => {}}: ButtonProps) => {
  return (
    <CustomButton style={style.purpleRoundButton} onClick={onClick} text={text} textStyle={style.whiteText} />
  )
}

export const DisabledPurpleRoundButton = ({text, onClick = () => {}}: ButtonProps) => {
  return (
    <CustomButton style={style.disabledPurpleRoundButton} onClick={onClick} text={text} textStyle={style.whiteText} />
  )
}

export const WhiteRoundButton = ({text, onClick = () => {}}: ButtonProps) => {
  return (
    <CustomButton style={style.whiteRoundButton} onClick={onClick} text={text} textStyle={style.purpleText} />
  )
}

export const DisabledWhiteRoundButton = ({text, onClick = () => {}}: ButtonProps) => {
  return (
    <CustomButton style={style.disabledWhiteRoundButton} onClick={onClick} text={text} textStyle={style.disabledPurpleText} />
  )
}

export const PurpleFullButton = ({text, onClick = () => {}}: ButtonProps) => {
  return (
    <CustomButton style={style.purpleFullButton} onClick={onClick} text={text} textStyle={style.whiteText} />
  )
}

export const DisabledPurpleFullButton = ({text, onClick = () => {}}: ButtonProps) => {
  return (
    <CustomButton style={style.disabledPurpleFullButton} onClick={onClick} text={text} textStyle={style.whiteText} />
  )
}

export default CustomButton;