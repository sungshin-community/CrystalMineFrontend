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
  const [newHotable, setNewHotable] = useState<boolean>(true);
  const [isSubmitState, setIsSubmitState] = useState<boolean>(false);

  useEffect(() => {
    async function init() {
      const boardInfo = await getBoardInfo(route.params.boardId);
      setBoardInfo(boardInfo);
    }
    init();
  }, []);

  useEffect(() => {
    setNewBoardIntroduction(boardInfo?.introduction);
    setNewHotable(boardInfo?.hotable);
  }, [boardInfo]);

  const onSubmitPress = async (
    boardId: number,
    newBoardIntroduction: string,
    newHotable: boolean,
  ) => {
    const result = await updateBoard(boardId, newBoardIntroduction, newHotable);
    if (result) {
      setTimeout(function () {
        Toast.show('게시판을 성공적으로 수정했습니다.', Toast.SHORT);
      }, 100);
      navigation.navigate('PostListScreen', {boardId: result.id});
    }
  };

  useEffect(() => {
    console.log(
      'newHotable:',
      newHotable,
      'newBoardIntroduction: ',
      newBoardIntroduction,
    );
    if (isSubmitState) {
      onSubmitPress(route.params.boardId, newBoardIntroduction, newHotable);
    }
    setIsSubmitState(false);
  }, [newHotable, newBoardIntroduction, isSubmitState]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: (): React.ReactNode => (
        <Pressable
          onPress={() => {
            setIsSubmitState(true);
            console.log('isSubmitState', isSubmitState)
          }}>
          <Text
            style={[
              styles.submit,
              fontRegular,
              {
                color: newBoardIntroduction ? '#A055FF' : '#87919B',
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
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[fontMedium, {fontSize: 15}]}>게시판 이름</Text>
            <LockIcon style={{marginLeft: 11}} />
          </View>
          <TextInput
            value={boardInfo?.name}
            editable={false}
            style={[
              fontRegular,
              {fontSize: 15, paddingVertical: 20, color: '#87919B'},
            ]}
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
              placeholderTextColor="#87919B"
              value={newBoardIntroduction}
              onChangeText={value => {
                setNewBoardIntroduction(value);
                if (value.length === 22)
                  Toast.show(
                    '게시판 설명은 22글자까지만 입력 가능합니다.',
                    Toast.SHORT,
                  );
              }}
              onBlur={() => {
                Keyboard.dismiss();
              }}
              style={[fontRegular, styles.input]}
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
            style={{flexDirection: 'row'}}
            onPress={() => {
              setNewHotable(!newHotable);
            }}>
            {newHotable ? <RectangleChecked /> : <RectangleUnchecked />}
            <Text style={[{marginLeft: 5}]}>HOT 게시판 전송 허용</Text>
          </Pressable>
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
    fontSize: 15,
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

import Svg, {SvgProps, Path} from 'react-native-svg';

const LockIcon = (props: SvgProps) => (
  <Svg
    width={12}
    height={17}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M10.5 6h-.75V4.5C9.75 2.43 8.07.75 6 .75 3.93.75 2.25 2.43 2.25 4.5V6H1.5C.675 6 0 6.675 0 7.5V15c0 .825.675 1.5 1.5 1.5h9c.825 0 1.5-.675 1.5-1.5V7.5c0-.825-.675-1.5-1.5-1.5ZM6 12.75c-.825 0-1.5-.675-1.5-1.5s.675-1.5 1.5-1.5 1.5.675 1.5 1.5-.675 1.5-1.5 1.5ZM8.325 6h-4.65V4.5A2.327 2.327 0 0 1 6 2.175 2.327 2.327 0 0 1 8.325 4.5V6Z"
      fill="#222"
    />
  </Svg>
);
