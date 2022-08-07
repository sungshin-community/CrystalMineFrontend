import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommonActions} from '@react-navigation/native';
import BackButton from '../../../components/BackButton';
import {fontBold, fontMedium, fontRegular} from '../../../common/font';
import ImageIcon from '../../../../resources/icon/ImageIcon';
import PhotoIcon from '../../../../resources/icon/PhotoIcon';
import {launchImageLibrary} from 'react-native-image-picker';
import {ModalBottom} from '../../../components/ModalBottom';
import Toast from 'react-native-simple-toast';
import {updateBoard, getBoardInfo} from '../../../common/boardApi';
import Board from '../../../classes/Board';
import {
  Checked,
  RectangleChecked,
  RectangleUnchecked,
} from '../../../../resources/icon/CheckBox';

type RootStackParamList = {
  PostListScreen: {boardId: number};
};
type Props = NativeStackScreenProps<RootStackParamList>;

function UpdateBoard({navigation, route}: Props) {
  const [boardInfo, setBoardInfo] = useState<Board>();
  const [newBoardIntroduction, setNewBoardIntroduction] = useState<string>('');
  const [newHotable, setNewHotable] = useState<boolean>();
  useEffect(() => {
    async function init() {
      const boardInfo = await getBoardInfo(route.params.boardId);
      setBoardInfo(boardInfo);
    }
    init()
  }, []);
  
  useEffect(() => {
    setNewBoardIntroduction(boardInfo?.introduction);
    setNewHotable(boardInfo?.hotable);
  },[boardInfo])
  
  const onSubmitPress = async () => {
    const result = await updateBoard(
      route.params.boardId,
      newBoardIntroduction,
      !newHotable,
    );
    // TODO: newHotable 불리언값 반대로 해야 적상 작동함. 확인 필요.
    if (result) {
      Toast.show('게시판을 성공적으로 수정했습니다.', Toast.SHORT);
      navigation.navigate('PostListScreen', {boardId: result.id});
    }
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: (): React.ReactNode => (
        <Pressable
          onPress={() => {
            if (newBoardIntroduction) onSubmitPress();
          }}>
          <Text
            style={[
              styles.submit,
              fontRegular,
              {
                color:
                  newBoardIntroduction ? '#A055FF' : '#87919B',
              },
            ]}>
            완료
          </Text>
        </Pressable>
      ),
    });
  }, [navigation, newBoardIntroduction]);

  return (
    <>
      <View style={styles.container}>
        <View style={{marginHorizontal: 24, paddingTop: 20}}>
          <Text style={[fontMedium, {fontSize: 15}]}>게시판 이름</Text>
          <TextInput
            value={boardInfo?.name}
            editable={false}
            style={{fontSize: 13, paddingVertical: 20, color: '#6E7882'}}
          />
          <View
            style={{
              borderBottomColor: '#F6F6F6',
              borderBottomWidth: 1,
              marginBottom: 15,
            }}
          />
          <Text style={[fontMedium, {fontSize: 15}]}>게시판 설명</Text>
          <View style={{height: 149}}>
            <TextInput
              textAlignVertical="top"
              placeholder="게시판 설명을 입력해주세요."
              value={newBoardIntroduction}
              onChangeText={value => {
                setNewBoardIntroduction(value);
              }}
              onBlur={() => {
                Keyboard.dismiss();
              }}
              style={[styles.input]}
              maxLength={22}
            />
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 24,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Pressable
            onPress={() => {
              setNewHotable(!newHotable);
            }}>
            {newHotable ? <RectangleChecked /> : <RectangleUnchecked />}
          </Pressable>
          <Text style={[{marginLeft: 5}]}>핫게시판 전송 허용</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  submit: {fontSize: 17, marginRight: 8},
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  input: {
    paddingTop: 14,
    paddingBottom: 14,
    textAlignVertical: 'top',
    fontSize: 13,
  },
  option: {
    marginTop: 19,
    marginLeft: 3,
    marginBottom: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default UpdateBoard;
