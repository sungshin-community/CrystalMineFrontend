import React from 'react';
import {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function WaterMark() {
  const [uuid, setUuid] = useState('');

  useEffect(() => {
    async function getUuid() {
      const uuid = await AsyncStorage.getItem('uuid');
      if (uuid != null) {
        setUuid(uuid);
      }
    }
    getUuid();
  });

  return (
    <View
      style={{flex: 1, position: 'absolute', zIndex: 1, elevation: 1}}
      pointerEvents={'none'}>
      <Text
        style={{
          fontSize: 19,
          opacity: 0.005,
          width: '2%',
        }}>
        {uuid.repeat(100)}
      </Text>
    </View>
  );
}

export default WaterMark;
