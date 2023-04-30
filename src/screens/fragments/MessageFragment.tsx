import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import {View} from 'react-native-animatable';
import {
  RectangleChecked,
  RectangleUnchecked,
} from '../../../resources/icon/CheckBox';
import SettingIcon from '../../../resources/icon/SettingIcon';
import MessageItem from '../../components/MessageItem';
import {ModalBottom} from '../../components/ModalBottom';
import WaterMark from '../../components/WaterMark';
import CheckEdit from '../../../resources/icon/CheckEdit';
import Hamburger from '../../../resources/icon/Hamburger';
const dummy = [
  {
    id: 0,
    nickname: '수정',
    boardType: '장터게시판',
    content: '안녕하세요 직거래로하시나요 택배로 거래하시나요? 답변주세요!!!',
    time: '방금',
    messageCount: 3,
    profileImage: '',
    isChecked: true,
  },
  {
    id: 1,
    nickname: '펭귄',
    boardType: '질문게시판',
    content: '나눔 받고싶어요',
    time: '방금',
    messageCount: '999+',
    profileImage: '',
    isChecked: false,
  },
  {
    id: 2,
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
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
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
    setSetting(false);
  };
  const clickSort = () => {
    setEdit(false);
    setSort(true);
    setSetting(false);
  };
  return (
    <>
      <WaterMark/>
      <SafeAreaView>
        {edit && (
          <View
            style={{backgroundColor: '#FFFFFF', height: 45, paddingTop: 15}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                onPress={() => {
                  setIsCheckedAll(!isCheckedAll);
                }}
                style={styles.check}>
                {isCheckedAll ? <RectangleChecked /> : <RectangleUnchecked />}
              </TouchableOpacity>
              <View style={{flexDirection: 'row', paddingRight: 24}}>
                <TouchableOpacity style={{marginRight: 18}}>
                  <Text>읽음</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setDeleteModalVisible(true);
                  }}>
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
        {setting && (
          <View style={styles.setting}>
            <TouchableOpacity
              style={styles.setItem}
              onPress={() => clickEdit()}>
              <CheckEdit />
              <Text style={styles.setText}>편집하기</Text>
            </TouchableOpacity>
            <View style={styles.hr} />
            <TouchableOpacity
              style={styles.setItem}
              onPress={() => clickSort()}>
              <Hamburger />
              <Text style={styles.setText}>정렬하기</Text>
            </TouchableOpacity>
          </View>
        )}
        {deleteModalVisible && (
          <ModalBottom
            modalVisible={deleteModalVisible}
            setModalVisible={setDeleteModalVisible}
            content="선택하신 쪽지를 삭제하시겠습니까?"
            purpleButtonText="삭제"
            whiteButtonText="취소"
            purpleButtonFunc={() => {
              console.log('DELETE OK');
            }}
            whiteButtonFunc={() => {
              setDeleteModalVisible(false);
          }}
        />
      )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  setting: {
    width: 137,
    height: 84,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    right: 2,
    top: 2,
  },
  setItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  setText: {
    paddingLeft: 8,
    fontSize: 16,
    fontWeight: '400',
  },
  check: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 27,
  },
  hr: {
    borderBottomColor: '#EFEFEF',
    borderBottomWidth: 1,
    marginHorizontal: 8,
  },
});
export default MessageFragment;
