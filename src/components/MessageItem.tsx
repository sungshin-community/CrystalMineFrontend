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
import {
  RectangleChecked,
  RectangleUnchecked,
} from '../../resources/icon/CheckBox';

interface Props {
  message: Message;
  edit: boolean;
}
const MessageItem = ({message, edit}: Props) => {
    console.log(Dimensions.get('window').width-125)
  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingVertical: 18,
          paddingHorizontal: 27,
          backgroundColor: message.messageCount == 0 ? '#FFFFFF' : '#F6F2FF',
        }}>
        {edit && (
          <View style={styles.check}>
            {message.isChecked ? <RectangleChecked /> : <RectangleUnchecked />}
          </View>
        )}
        <View>
          {/* <ProfileImage /> */}
          {message.profileImage ? (
            <Image
              style={{width: 36, height: 36}}
              source={{uri: message.profileImage}}
            />
          ) : (
            <ProfileImageBig />
          )}
        </View>
        <View style={{marginLeft: 13}}>
          <View style={styles.line}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.nickname}>
                {message.nickname ? message.nickname : '수정'}
              </Text>
              <Text style={styles.smallText}>{message.boardType}</Text>
            </View>
            <Text style={styles.smallText}>{message.time}</Text>
          </View>
          <View style={{
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
              {message.content}
            </Text>
            {message.messageCount == 0 ? null : (
              <View style={styles.count}>
                <Text style={{color: '#FFFFFF', fontSize: 11, fontWeight: '500'}}>
                  {message.messageCount}
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
