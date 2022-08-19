import React from 'react';
import {useState, useEffect} from 'react';
import {Dimensions, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function WaterMark() {
  const [uuid, setUuid] = useState<string>('');
  const [isUuid, setIsUuid] = useState(false);
  const [now, setNow] = useState<string>('');
  let uuuid: string | null = '';

  useEffect(() => {
    async function getUuid() {
      const storageUuid: string | null = await AsyncStorage.getItem('uuid');
      uuuid = await AsyncStorage.getItem('uuid');
      if (storageUuid === null || storageUuid === '') setIsUuid(false);
      else {
        setIsUuid(true);
        setUuid(storageUuid);
      }
      // console.log('storageUuid', storageUuid);
    }
    getUuid();
  }, []);

  useEffect(() => {
    const getNow = () => {
      let today = new Date();
      let time = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        date: today.getDate(),
        hours: today.getHours(),
        minutes: today.getMinutes(),
      };
      let timestring = ` [${time.year}/${time.month}/${time.date} ${time.hours}:${time.minutes}] `;
      setNow(timestring);
    };
    getNow();
  }, []);
  console.log(now);
  return (
    <>
      {/* {isUuid && ( */}
        <View
          style={{
            flex: 1,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            zIndex: 1,
            elevation: 1,
          }}
          pointerEvents={'none'}>
          <Text
            style={{
              fontSize: 25,
              opacity: 0.007,
            }}>
            {(uuid).repeat(100)}
          </Text>
        </View>
      {/* )} */}
    </>
  );
}

export default WaterMark;
