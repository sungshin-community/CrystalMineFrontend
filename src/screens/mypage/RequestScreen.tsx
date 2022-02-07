import React, {useEffect} from 'react';
import {Keyboard, StyleSheet, Text, TextInput, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommonActions} from '@react-navigation/native';
import BackButton from '../../components/BackButton';
import {fontMedium, fontRegular} from '../../common/font';
import ImageIcon from '../../../resources/icon/ImageIcon';
import PhotoIcon from '../../../resources/icon/PhotoIcon';

type RootStackParamList = {
  SignUpComplete: undefined;
  MajorSelect: {userId: string; password: string; nickname: string};
};
type Props = NativeStackScreenProps<RootStackParamList>;

function RequestScreen({navigation}: Props) {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: (): React.ReactNode => (
        <BackButton
          onPress={() => navigation.dispatch(CommonActions.goBack())}
        />
      ),
      headerRight: (): React.ReactNode => (
        <Text style={[styles.submit, fontRegular]}>제출</Text>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[fontMedium, styles.title]}>문의 내용</Text>
        <Text style={[fontRegular, styles.date]}>2022.02.05</Text>
      </View>
      <View>
        <TextInput
          placeholder="문의 내용을 입력해주세요."
          autoCorrect={false}
          multiline={true}
          onBlur={() => {
            Keyboard.dismiss();
            console.log('키보드다른데클릭');
          }}
          style={[fontRegular, styles.input]}
        />
      </View>
      <View style={styles.image}>
        <ImageIcon />
        <Text style={[fontMedium, styles.imageText]}>이미지</Text>
      </View>
      <View style={styles.imageBox}>
        <PhotoIcon />
        <Text style={[fontMedium, styles.count]}>3/10</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  submit: {color: '#A055FF', fontSize: 17, marginRight: 8},
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 8,
  },
  title: {
    fontSize: 15,
    marginLeft: 17,
  },
  date: {
    fontSize: 13,
    color: '#6E7882',
    marginRight: 18,
  },
  input: {
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    minHeight: 194,
    fontSize: 15,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 14,
    lineHeight: 21,
  },
  image: {
    marginTop: 19,
    marginLeft: 3,
    marginBottom: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageText: {fontSize: 14, color: '#444444', marginLeft: 8},
  imageBox: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    fontSize: 8,
    color: '#d1d1d1',
  },
});

export default RequestScreen;
