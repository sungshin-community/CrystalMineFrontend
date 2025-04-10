import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

export const imgUrlCoverting = (arr: string[]) => {
  const array = arr.map(url => {
    return {url: url};
  });
  return array;
};

export const formatTime = (time: string) => {
  var formattedTime = time.slice(11, 16);

  var h = parseInt(formattedTime.slice(0, 2));
  var formattedHours = h === 0 || h === 12 ? 12 : h % 12;
  var period = h >= 12 ? '오후' : '오전';

  return period + ' ' + formattedHours + formattedTime.slice(2);
};

export const formatDate = (day: string) => {
  var d = new Date(day);
  return (
    d.getFullYear() + '년 ' + (d.getMonth() + 1) + '월 ' + d.getDate() + '일'
  );
};

export const DateBox = (time: any) => {
  return (
    <View style={{alignItems: 'center', marginBottom: 14, marginTop: 20}}>
      <View
        style={{
          backgroundColor: '#EFEFF3',
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 15,
          overflow: 'hidden',
          elevation: 0,
        }}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '500',
            color: '#89919A',
            textAlign: 'center',
          }}>
          {formatDate(time.time)}
        </Text>
      </View>
    </View>
  );
};

export const MyChat = (items: any) => {
  const navigation = useNavigation();
  var data = items.items;
  return (
    <View style={{alignItems: 'flex-end', marginRight: 24, marginBottom: 6}}>
      <View style={styles.line}>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={styles.read}>{data.readAt ? '' : '안읽음'}</Text>
          <Text style={styles.chatTime}>{formatTime(data.createdAt)}</Text>
        </View>
        {data.photoUrl ? (
          <Pressable
            onPress={() =>
              navigation.navigate('ImageViewerScreen', {
                imageUrls: imgUrlCoverting([data.photoUrl]),
              })
            }>
            <Image
              source={{uri: data.photoUrl}}
              style={{width: 140, height: 140, borderRadius: 10}}
            />
          </Pressable>
        ) : (
          <View style={[styles.chat, {backgroundColor: '#F3EBFC'}]}>
            <Text>{data.chat}</Text>
          </View>
        )}
      </View>
    </View>
  );
};
export const OtherChat = (items: any) => {
  const navigation = useNavigation();
  var data = items.items;
  return (
    <View style={{alignItems: 'flex-start', marginLeft: 24, marginBottom: 6}}>
      <View style={styles.line}>
        {data.photoUrl ? (
          <Pressable
            onPress={() =>
              navigation.navigate('ImageViewerScreen', {
                imageUrls: imgUrlCoverting([data.photoUrl]),
              })
            }>
            <Image
              source={{uri: data.photoUrl}}
              style={{width: 140, height: 140, borderRadius: 10}}
            />
          </Pressable>
        ) : (
          <View style={[styles.chat, {backgroundColor: '#EFEFF3'}]}>
            <Text>{data.chat}</Text>
          </View>
        )}
        <Text style={styles.chatTime}>{formatTime(data.createdAt)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chat: {
    maxWidth: 240,
    color: '#222222',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  chatTime: {
    color: '#6E7882',
    fontSize: 10,
    paddingHorizontal: 8,
  },
  read: {
    marginRight: 8,
    marginBottom: 2,
    color: '#A055FF',
    fontSize: 10,
  },
});
