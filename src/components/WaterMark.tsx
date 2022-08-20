import React from 'react';
import {useState, useEffect} from 'react';
import {Dimensions, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function WaterMark({ uuid }: any) {
  const [now, setNow] = useState<string>('');

  useEffect(() => {
    const getNow = () => {
      let today = new Date();
      let time = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        date: today.getDate(),
        // hours: today.getHours(),
        // minutes: today.getMinutes(),
      };
      // let timestring = ` [${time.year}/${time.month}/${time.date} ${time.hours}:${time.minutes}] `;
      let timestring = ` [${time.year}/${time.month}/${time.date}] `;
      setNow(timestring);
    };
    getNow();
  }, []);
  return (
    <>
        <View
          style={{
            flex: 1,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            zIndex: 1,
            elevation: 1,
            flexDirection: 'row',
            justifyContent: 'center'
          }}
          pointerEvents={'none'}>
          <Text
            style={{
            fontSize: 24,
            opacity: 0.007,
            fontFamily: 'SpoqaHanSansNeo-light',
            lineHeight: 48,
            }}>
            {(uuid + now).repeat(100)}
          </Text>
        </View>
    </>
  );
}

export default WaterMark;
