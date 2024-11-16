import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
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
import {createBoard} from '../../../common/boardApi';
import {
  Checked,
  RectangleChecked,
  RectangleUnchecked,
} from '../../../../resources/icon/CheckBox';
import {
  GreyBigFoldButton,
  GreyBigSpreadButton,
} from '../../../../resources/icon/Button';
import {PurpleRoundButton, CustomButton} from '../../../components/Button';
type RootStackParamList = {
  PostListScreen: {boardId: number};
};
type Props = NativeStackScreenProps<RootStackParamList>;
enum BoardContentType {
  TYPE1 = 'TYPE1', // 제목 + 본문
  TYPE2 = 'TYPE2', // 제목 + 본문 + 사진
  TYPE3 = 'TYPE3', // 제목 + 사진
}

function CreateBoard({navigation}: Props) {
  const [boardName, setBoardName] = useState<string>('');
  const [boardIntroduction, setBoardIntroduction] = useState<string>('');
  const [hotable, setHotable] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitState, setIsSubmitState] = useState<boolean>(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [boardType, setBoardType] = useState<BoardContentType>(
    BoardContentType.TYPE1,
  );
  const [isSpread, setIsSpread] = useState(false);

  const boardTypes = [
    {id: BoardContentType.TYPE1, label: '제목 + 본문'},
    {id: BoardContentType.TYPE2, label: '제목 + 본문 + 사진'},
    {id: BoardContentType.TYPE3, label: '제목 + 사진'},
  ];

  const selectedBoardType =
    boardTypes.find(item => item.id === boardType)?.label || '제목 + 본문';

  const handleSelectBoardType = (type: BoardContentType) => {
    setBoardType(type);
    setIsDropdownVisible(false);
    setIsSpread(true);
  };

  const onSubmitPress = async (
    boardName: string,
    boardIntroduction: string,
    hotable: boolean,
    type: BoardContentType,
  ) => {
    setIsLoading(true);
    const result = await createBoard(
      boardName,
      boardIntroduction,
      hotable,
      type,
    );
    setIsLoading(false);
    if (result.code === 'CREATE_BOARD_SUCCESS') {
      setTimeout(function () {
        Toast.show('게시판을 성공적으로 생성했습니다.', Toast.SHORT);
      }, 100);
      navigation.pop();
      navigation.pop();
      navigation.navigate('PostListScreen', {boardId: result.data.id});
    } else if (result.code === 'BOARD_NAME_DUPLICATION') {
      setTimeout(function () {
        Toast.show('이미 존재하는 게시판 이름입니다. ', Toast.SHORT);
      }, 100);
    } else
      setTimeout(function () {
        Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
      }, 100);
  };

  useEffect(() => {
    if (isSubmitState) {
      onSubmitPress(boardName, boardIntroduction, hotable, boardType);
    }
    setIsSubmitState(false);
  }, [hotable, boardIntroduction, isSubmitState]);

  /*   useEffect(() => {
    navigation.setOptions({
      headerRight: (): React.ReactNode => (
        <Pressable
          onPress={() => {
            if (boardName && boardIntroduction) {
              setIsSubmitState(true);
              console.log('isSubmitState', isSubmitState);
            }
          }}>
          <Text
            style={[
              styles.submit,
              fontRegular,
              {color: boardName && boardIntroduction ? '#A055FF' : '#87919B'},
            ]}>
            완료
          </Text>
        </Pressable>
      ),
    });
  }, [navigation, boardName, boardIntroduction]); */

  return (
    <>
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: '#000',
        }}>
        <ActivityIndicator
          size="large"
          color={'#A055FF'}
          animating={isLoading}
          style={{zIndex: 100}}
        />
      </View>
      <View style={styles.container}>
        <View style={{marginHorizontal: 24, paddingTop: 20}}>
          <Text style={[fontMedium, {fontSize: 16, paddingBottom: 12}]}>
            게시판 형태<Text style={styles.asterisk}> *</Text>
          </Text>
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => {
              setIsDropdownVisible(!isDropdownVisible);
              setIsSpread(!isSpread);
            }}>
            <Text style={{color: '#B9BAC1', fontSize: 14}}>
              {selectedBoardType}
            </Text>
            {isSpread ? <GreyBigFoldButton /> : <GreyBigSpreadButton />}
          </TouchableOpacity>
          {isDropdownVisible && (
            <View style={styles.dropdownContainer}>
              <FlatList
                data={boardTypes}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.optionButton}
                    onPress={() => handleSelectBoardType(item.id)}>
                    <Text style={styles.optionText}>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
          <Text
            style={[
              fontMedium,
              {fontSize: 16, paddingBottom: 12, marginTop: 24},
            ]}>
            게시판 명<Text style={styles.asterisk}> *</Text>
          </Text>
          <TextInput
            placeholderTextColor="#B9BAC1"
            placeholder="게시판 명을 입력해 주세요."
            value={boardName}
            autoCorrect={false}
            onChangeText={value => {
              setBoardName(value);
              if (value.length === 15)
                Toast.show(
                  '게시판 이름, 설명의 글자 수를 확인해주세요.',
                  Toast.SHORT,
                );
            }}
            maxLength={15}
            style={{
              fontSize: 14,
              paddingVertical: 5,
              paddingHorizontal: 12,
              borderColor: '#E2E4E8',
              borderRadius: 4,
              borderWidth: 1,
              //width: 343,
              height: 44,
            }}
            numberOfLines={1}
          />
          <View
            style={{
              borderBottomColor: '#F6F6F6',
              borderBottomWidth: 1,
              marginBottom: 24,
            }}
          />
          <Text style={[fontMedium, {fontSize: 16, paddingBottom: 12}]}>
            게시판 소개<Text style={styles.asterisk}> *</Text>
          </Text>
          <View style={{height: 149}}>
            <TextInput
              placeholderTextColor="#B9BAC1"
              placeholder="게시판 소개를 입력해 주세요."
              textAlignVertical="top"
              value={boardIntroduction}
              autoCorrect={false}
              onChangeText={value => {
                setBoardIntroduction(value);
                if (value.length === 22)
                  Toast.show(
                    '게시판 이름, 설명의 글자 수를 확인해주세요.',
                    Toast.SHORT,
                  );
              }}
              maxLength={22}
              onBlur={() => {
                Keyboard.dismiss();
              }}
              style={[
                styles.input,
                {fontSize: 14, borderRadius: 4, paddingHorizontal: 12},
              ]}
            />
          </View>
        </View>
        <Pressable
          onPress={() => navigation.navigate('DirectionAgreeScreen')}
          style={{
            borderRadius: 25,
            backgroundColor: '#F6F6F6',
            alignSelf: 'center',
            width: 'auto',
            paddingTop: 6,
            paddingRight: 12,
            paddingBottom: 6,
            paddingLeft: 12,
            position: 'absolute',
            bottom: 110,
          }}>
          <Text
            style={{
              fontWeight: '400',
              color: '#9DA4AB',
              textAlign: 'center',
              paddingHorizontal: 4,
              paddingVertical: 4,
            }}>
            수정광산 이용 방향 전문 보기
          </Text>
        </Pressable>
        <View
          style={{
            height: 44,
            borderRadius: 4,
            //paddingHorizontal: 24,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#A055FF',
            bottom: 0,
            marginBottom: 34,
            marginHorizontal: 16,
            position: 'absolute',
          }}>
          <Pressable
            onPress={() => {
              setIsSubmitState(true);
              console.log('isSubmitState', isSubmitState);
            }}>
            <PurpleRoundButton
              text="완료"
              onClick={() =>
                onSubmitPress(boardName, boardIntroduction, hotable, boardType)
              }
              style={{color: '#fff'}}
            />
          </Pressable>
          {/* <Pressable
            onPress={() => {
              setHotable(!hotable);
            }}
            style={{flexDirection: 'row'}}>
            {hotable ? <RectangleChecked /> : <RectangleUnchecked />}
            <Text style={[{marginLeft: 5}]}>HOT 게시판 전송 허용</Text>
          </Pressable> */}
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
    borderColor: '#E2E4E8',
    borderWidth: 1,
    //width: 343,
    height: 86,
  },
  option: {
    marginTop: 19,
    marginLeft: 3,
    marginBottom: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderColor: '#E2E4E8',
    borderWidth: 1,
    borderRadius: 4,
    height: 44,
  },
  dropdownContainer: {
    borderColor: '#E2E4E8',
    borderWidth: 1,
    borderRadius: 4,
    maxHeight: 132,
    overflow: 'hidden',
    backgroundColor: 'white',
    zIndex: 1,
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E4E8',
    fontSize: 14,
    height: 44,
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  asterisk: {
    color: '#A055FF',
    fontSize: 16,
  },
});

export default CreateBoard;
