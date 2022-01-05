import React from 'react';
import {
  TouchableOpacity,
  Text,
  GestureResponderEvent,
  Button,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
  },
  text: {
    width: 56,
    height: 26,
    color: '#87919B',
    backgroundColor: '#E2E4E8',
    fontSize: 15,
    fontFamily: 'SpoqaHanSansNeo-Regular',
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

interface ICountdown {
  minutes: number;
  seconds: number;
}

const CountDownTimer = ({minutes = 0, seconds = 60}: ICountdown) => {
  const [time, setTime] = React.useState<ICountdown>({minutes, seconds});

  const tick = () => {
    if (time.minutes === 0 && time.seconds === 0) reset();
    else if (time.seconds === 0) {
      setTime({minutes: time.minutes - 1, seconds: 59});
    } else {
      setTime({minutes: time.minutes, seconds: time.seconds - 1});
    }
  };

  const reset = () => setTime({minutes: time.minutes, seconds: time.seconds});

  React.useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {`${time.minutes.toString().padStart(2, '0')}:${time.seconds
          .toString()
          .padStart(2, '0')}`}
      </Text>
    </View>
  );
};

export default CountDownTimer;
