import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Alert, TextInput} from 'react-native';

import OTPTextView from 'react-native-otp-textinput';

const styles = StyleSheet.create({
  textInputContainer: {
    borderColor: '#A055FF',
    width: 25
  },
  textInput: {
    fontSize: 45,
    fontWeight: '400',
  }

});

class AuthInput extends Component {
  state = {
    otpInput: '',
    inputText: '',
  };

  updateOtpText = () => {
    this.input1.setValue(this.state.inputText);
  };

  render() {
    return (
      <View style={styles.container}>
       
        <OTPTextView
          ref={(e) => (this.input1 = e)}
          containerStyle={styles.textInputContainer}
          textInputStyle={styles.textInput}
          handleTextChange={(text) => this.setState({otpInput: text})}
          inputCount={6}
          tintColor='#A055FF'
          keyboardType="numeric"
          
        />

      </View>
    );
  }
}
export default AuthInput;
