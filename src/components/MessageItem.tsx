import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Message} from '../classes/MessageDto';
import ProfileImageBig from '../../resources/icon/ProfileImageBig';

const MessageItem = ({
  nickname = '',
  boardType = '장터게시판',
  content = '안녕하세요 직거래로하시나요 택배로 거래하시나요? 답변주세요!!!',
  isRead = true,
  time = '방금',
  messageCount = 3,
  profileImage = '',
}: Message) => {
  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingVertical: 18,
          paddingHorizontal: 27,
          backgroundColor: isRead ? '#FFFFFF' : '#F6F2FF',
        }}>
        <View>
          {/* <ProfileImage /> */}
          {profileImage ? (
            <Image
              style={{width: 36, height: 36}}
              source={{uri: profileImage}}
            />
          ) : (
            <ProfileImageBig />
          )}
        </View>
        <View style={{marginLeft: 13}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.nickname}>
                {nickname ? nickname : '수정'}
              </Text>
              <Text style={styles.smallText}>{boardType}</Text>
            </View>
            <Text style={styles.smallText}>{time}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              ellipsizeMode={'tail'}
              numberOfLines={1}
              style={styles.content}>
              {content}
            </Text>
            <View style={styles.count}>
              <Text style={{color: '#FFFFFF', fontSize: 11, fontWeight: '500'}}>
                {messageCount}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  nickname: {
    fontWeight: '500',
    marginRight: 6,
    marginBottom: 4,
  },
  smallText: {
    lineHeight: 14,
    fontSize: 11,
    fontWeight: '400',
    color: '#9DA4AB',
  },
  content: {
    width: Dimensions.get('window').width - 115,
    color: '#6E7882',
    paddingRight: 5,
  },
  count: {
    backgroundColor: '#FF6376',
    paddingVertical: 2,
    paddingHorizontal: 5.5,
    borderRadius: 28,
  },
});

export default MessageItem;
