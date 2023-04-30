import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import {View} from 'react-native-animatable';
import {
  RectangleChecked,
  RectangleUnchecked,
} from '../../../resources/icon/CheckBox';
import SettingIcon from '../../../resources/icon/SettingIcon';
import MessageItem from '../../components/MessageItem';
import WaterMark from '../../components/WaterMark';

const dummy = [
  {
    nickname: '수정',
    boardType: '장터게시판',
    content: '안녕하세요 직거래로하시나요 택배로 거래하시나요? 답변주세요!!!',
    time: '방금',
    messageCount: 3,
    profileImage: '',
    isChecked: true,
  },
  {
    nickname: '펭귄',
    boardType: '질문게시판',
    content: '나눔 받고싶어요',
    time: '방금',
    messageCount: '999+',
    profileImage: '',
    isChecked: false,
  },
  {
    nickname: '초록초록',
    boardType: '자수정',
    content: '집에 나온 거미 잡아줄 사람?? 제발',
    time: '방금',
    messageCount: 0,
    profileImage: '',
    isChecked: false,
  },
];

const MessageFragment = () => {
  const [setting, setSetting] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [sort, setSort] = useState<boolean>(false);
  const [isCheckedAll, setIsCheckedAll] = useState<boolean>(false);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontSize: 19,
        fontFamily: 'SpoqaHanSansNeo-Medium',
      },
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setSetting(!setting)}
          style={{padding: 19}}>
          <SettingIcon />
        </TouchableOpacity>
      ),
    });
  });

  const clickEdit = () => {
    setEdit(true);
    setSort(false);
  };
  const clickSort = () => {
    setEdit(false);
    setSort(true);
  };
  return (
    <>
      <WaterMark/>
      <SafeAreaView style={{flex: 1}}>
        {edit && (
          <View
            style={{backgroundColor: '#FFFFFF', height: 45, paddingTop: 15}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                onPress={() => {
                  setIsCheckedAll(!isCheckedAll);
                }}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  paddingLeft: 27}}>
                {isCheckedAll ? <RectangleChecked /> : <RectangleUnchecked />}
              </TouchableOpacity>
              <View style={{flexDirection: 'row', paddingRight: 24}}>
                <TouchableOpacity style={{marginRight: 18}}>
                  <Text>읽음</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>삭제</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={dummy}
          renderItem={({item}) => <MessageItem message={item} edit={edit} />}
          ItemSeparatorComponent={() => (
            <View style={{height: 1, backgroundColor: '#F6F6F6'}}></View>
          )}
        />

        <View>
          <TouchableOpacity onPress={() => clickEdit()}>
            <Text>편집하기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => clickSort()}>
            <Text>정렬하기</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};
export default MessageFragment;
