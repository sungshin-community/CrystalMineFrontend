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
      style={{flex: 1, position: 'absolute',left:0, right:0, top:0, zIndex: 1, elevation: 1}}
      pointerEvents={'none'}>
      <Text
        style={{
          fontSize: 30,
          opacity: 0.7,
          width: '100%',
        }}>
        {uuid.repeat(100)}
      </Text>
    </View>
  );
}

export default WaterMark;
