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
import {createBoard} from '../../../common/boardApi';
import {
  Checked,
  RectangleChecked,
  RectangleUnchecked,
} from '../../../../resources/icon/CheckBox';

type RootStackParamList = {
  PostListScreen: {boardId: number};
};
type Props = NativeStackScreenProps<RootStackParamList>;

function CreateBoard({navigation}: Props) {
  const [boardName, setBoardName] = useState<string>('');
  const [boardIntroduction, setBoardIntroduction] = useState<string>('');
  const [hotable, setHotable] = useState<boolean>(true);

  const onSubmitPress = async () => {
    const result = await createBoard(boardName, boardIntroduction, hotable);
    if (result.code === 'CREATE_BOARD_SUCCESS') {
      Toast.show('게시판을 성공적으로 생성했습니다.', Toast.SHORT);
      navigation.pop();
      navigation.pop();
      navigation.navigate('PostListScreen', { boardId: result.data.id });
    }
    else if (result.code === 'BOARD_NAME_DUPLICATION') {
      Toast.show('이미 존재하는 게시판 이름입니다. ', Toast.SHORT);
    }
    else 
      Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: (): React.ReactNode => (
        <Pressable
          onPress={() => {
            if (boardName && boardIntroduction) onSubmitPress();
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
  }, [navigation, boardName, boardIntroduction]);

  return (
    <>
      <View style={styles.container}>
        <View style={{marginHorizontal: 24, paddingTop: 20}}>
          <Text style={[fontMedium, {fontSize: 15}]}>게시판 이름</Text>
          <TextInput
            placeholder="게시판 이름은 공백포함 15글자까지 입력 가능합니다."
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
            style={{fontSize: 15, paddingVertical: 20}}
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
              placeholder="게시판 설명은 공백포함 22글자까지 입력 가능합니다."
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
            paddingHorizontal: 24,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Pressable
            onPress={() => {
              setHotable(!hotable);
            }}
            style={{flexDirection: 'row'}}>
            {hotable ? <RectangleChecked /> : <RectangleUnchecked />}
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
