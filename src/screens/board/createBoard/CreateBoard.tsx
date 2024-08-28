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
import {PurpleRoundButton, CustomButton} from '../../../components/Button';
type RootStackParamList = {
  PostListScreen: {boardId: number};
};
type Props = NativeStackScreenProps<RootStackParamList>;

function CreateBoard({navigation}: Props) {
  const [boardName, setBoardName] = useState<string>('');
  const [boardIntroduction, setBoardIntroduction] = useState<string>('');
  const [hotable, setHotable] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitState, setIsSubmitState] = useState<boolean>(false);

  const onSubmitPress = async (
    boardName: string,
    boardIntroduction: string,
    hotable: boolean,
  ) => {
    setIsLoading(true);
    const result = await createBoard(boardName, boardIntroduction, hotable);
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
      onSubmitPress(boardName, boardIntroduction, hotable);
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
          <Text style={[fontMedium, {fontSize: 15, paddingBottom: 12}]}>
            게시판 명을 입력해 주세요.
          </Text>
          <TextInput
            placeholderTextColor="#D5DBE1"
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
              fontSize: 15,
              paddingVertical: 5,
              borderColor: '#E2E4E8',
              borderWidth: 1,
              width: 343,
              height: 44,
            }}
            numberOfLines={1}
          />
          <View
            style={{
              borderBottomColor: '#F6F6F6',
              borderBottomWidth: 1,
              marginBottom: 40,
            }}
          />
          <Text style={[fontMedium, {fontSize: 15, paddingBottom: 12}]}>
            게시판을 소개해 주세요.
          </Text>
          <View style={{height: 149}}>
            <TextInput
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
              style={[styles.input, {fontSize: 15}]}
            />
          </View>
        </View>
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
                onSubmitPress(boardName, boardIntroduction, hotable)
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
    width: 343,
    height: 86,
  },
  option: {
    marginTop: 19,
    marginLeft: 3,
    marginBottom: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CreateBoard;
