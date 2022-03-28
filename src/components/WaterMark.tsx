import React from 'react';
import {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function WaterMark() {
  const [uuid, setUuid] = useState('');
  const [time, setTime] = useState('');
  useEffect(() => {
    async function getUuid() {
      const uuid = await AsyncStorage.getItem('uuid');
      if (uuid != null) {
        setUuid(uuid);
      }
    }
    getUuid();
  });
  useEffect(() => {
    let today = new Date();
    let time = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      date: today.getDate(),
      hours: today.getHours(),
      minutes: today.getMinutes(),
    };
    let timeString = `${time.year}/${time.month}/${time.date} ${time.hours}:${time.minutes}`;
    setTime(timeString);
  }, []);
  let waterMarkString = '🔮' + uuid + '🔮' + time;

  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 1,
        elevation: 1,
      }}
      pointerEvents={'none'}>
      <Text
        style={{
          fontSize: 26,
          opacity: 1.007,
          width: '100%',
        }}>
        {waterMarkString.repeat(100)}
      </Text>
    </View>
  );
}

export default WaterMark;
