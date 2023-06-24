import React from 'react';
import {
  Pressable,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {MessageRoom} from '../classes/MessageDto';
import ProfileImageBig from '../../resources/icon/ProfileImageBig';
import {
  RectangleChecked,
  RectangleUnchecked,
} from '../../resources/icon/CheckBox';

interface Props {
  navigation: any;
  message: MessageRoom;
  edit: boolean;
  isCheckedAll: boolean;
  onPressCheck: (message: MessageRoom) => void;
}
const MessageItem = ({
  navigation,
  message,
  edit,
  isCheckedAll,
  onPressCheck,
}: Props) => {
  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingVertical: 18,
          paddingHorizontal: 27,
          backgroundColor: message.unreadCount === 0 ? '#FFFFFF' : '#F6F2FF',
        }}
        onPress={() => {
          navigation.navigate('MessageScreen', {roomId: message.roomId});
        }}>
        {edit && (
          <Pressable
            style={styles.check}
            hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
            onPress={() => onPressCheck(message)}>
            {message.isChecked || isCheckedAll ? (
              <RectangleChecked />
            ) : (
              <RectangleUnchecked />
            )}
          </Pressable>
        )}
        <View>
          {/* <ProfileImage /> */}
          {message.partnerProfile ? (
            <Image
              style={{width: 36, height: 36}}
              source={{uri: message.partnerProfile}}
            />
          ) : (
            <ProfileImageBig />
          )}
        </View>
        <View style={{marginLeft: 13}}>
          <View style={styles.line}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.nickname}>
                {message.partnerNickname ? message.partnerNickname : '수정'}
              </Text>
              <Text style={styles.smallText}>{message.postBoard}</Text>
            </View>
            <Text style={styles.smallText}>{message.lastChatTime}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: edit
                ? Dimensions.get('window').width - 125
                : Dimensions.get('window').width - 100,
            }}>
            <Text
              ellipsizeMode={'tail'}
              numberOfLines={1}
              style={{
                width: edit ? Dimensions.get('window').width - 205 : 250,
                color: '#6E7882',
                paddingRight: 5,
              }}>
              {message.lastChat}
            </Text>
            {message.unreadCount === 0 ? null : (
              <View style={styles.count}>
                <Text
                  style={{color: '#FFFFFF', fontSize: 11, fontWeight: '500'}}>
                  {message.unreadCount}
                </Text>
              </View>
            )}
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
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallText: {
    lineHeight: 14,
    fontSize: 11,
    fontWeight: '400',
    color: '#9DA4AB',
  },
  count: {
    backgroundColor: '#FF6376',
    paddingVertical: 2,
    paddingHorizontal: 5.5,
    borderRadius: 28,
  },
  check: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: 18,
    paddingRight: 10,
  },
});

export default MessageItem;
