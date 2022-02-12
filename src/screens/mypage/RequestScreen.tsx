import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, Pressable, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CommonActions} from '@react-navigation/native';
import BackButton from '../../components/BackButton';
import {fontMedium} from '../../common/font';
import RightArrow from '../../../resources/icon/Arrow';

type RootStackParamList = {
  RequestWriteScreen: undefined;
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
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{backgroundColor: '#F6F6F6'}}>
      <View style={styles.menuContainer}>
        <Pressable hitSlop={{top: 16}}>
          <View style={styles.menu}>
            <Text style={[fontMedium, styles.menuText]}>문의 리스트</Text>
            <View style={styles.menuIcon}>
              <RightArrow />
            </View>
          </View>
        </Pressable>
        <Pressable
          hitSlop={{bottom: 16}}
          onPress={() => navigation.navigate('RequestWriteScreen')}>
          <View style={styles.menu}>
            <Text style={[fontMedium, styles.menuText]}>문의하기</Text>
            <View style={styles.menuIcon}>
              <RightArrow />
            </View>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  menuContainer: {paddingVertical: 16, backgroundColor: 'white'},
  menuIcon: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    paddingRight: 31,
  },
  menu: {
    flexDirection: 'row',
    paddingVertical: 11,
    paddingLeft: 34,
    alignItems: 'center',
  },
  menuText: {
    fontSize: 15,
  },
});

export default RequestScreen;
