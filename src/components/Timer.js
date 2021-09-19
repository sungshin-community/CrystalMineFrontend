import { Text, View , Button, StyleSheet } from 'react-native';
import React, { useState, useEffect } from "react";
 
const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingLeft: 167
      },
      text: {
        width: 56,
        height: 26,
        color: "#87919B",
        backgroundColor: "#E2E4E8",
        fontSize: 15,
        padding: 4

      }
});

var _interval

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minute: 0,
            second: 0,
        };
    }

     render(){
        return (
            <View style={styles.container}>
                {/* <Text>{this.state.minutes}:{this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds}</Text> */}
                <Text style={styles.text}>02:35</Text>
            </View>
        )
    } 

    countdown() {
        interval = setInterval(() => {
            this.setState({second :  this.state.second + 1})
        }, 1000)

        setInterval(() => {
            if (parseInt(seconds) > 0) {
                setSeconds(parseInt(seconds) - 1);
            }
            if (parseInt(seconds) === 0) {
                if (parseInt(minutes) === 0) {
                    clearInterval(countdown);
                } else {
                setMinutes(parseInt(minutes) - 1);
                setSeconds(59);
                }
            }
        }, 1000);
        return () => clearInterval(countdown);
    }
    
}

export default Timer;

