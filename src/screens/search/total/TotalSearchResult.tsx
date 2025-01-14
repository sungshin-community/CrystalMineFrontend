import React, {useEffect, useState, useRef} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {View} from 'react-native-animatable';
import SearchIcon from '../../../../resources/icon/SearchIcon';
import TagSearchResult from '../../board/TagSearchResult';
import CancelButton from '../../../../resources/icon/Cancel';
import {fontBold, fontRegular} from '../../../common/font';
import PostSearchResult from './PostSearchResult';
import CrystalSearchResult from './CrystalSearchResult';
import BoardSearchResult from './BoardSearchResult';
import {saveRecentSearchWord} from '../../../common/util/recentSearchWordsUtil';
import InputDeleteButton from './InputDeleteButton';

type RootStackParamList = {
  SearchResult: {
    searchWord: any;
  };
  SearchResultInBoard: {
    searchWord: any;
    boardName: any;
    boardId?: number;
  };
  GlobalNavbar: undefined;
  PostListScreen: {boardId: number};
  MyPostList: undefined;
  MyCommentList: undefined;
  ScrapedPostList: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;
const Tab = createMaterialTopTabNavigator();
let tabWidth = (Dimensions.get('window').width / 3 - 24) / 2;

function TotalSearchResult({navigation, route}: Props) {
  // 검색어 상태 관리
  const [inputText, setInputText] = useState<string>(
    route.params?.searchWord || '',
  );
  const [searchWord, setSearchWord] = useState<string>(
    route.params?.searchWord || '',
  );

  const handleSearch = (text: string) => {
    setSearchWord(text);
  };

  const handleClear = () => {
    setInputText('');
    setSearchWord('');
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.container}>
          <TextInput
            autoFocus={true}
            style={styles.input}
            placeholder="검색"
            placeholderTextColor="#89919A"
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={e => handleSearch(e.nativeEvent.text)}
          />
          <View style={styles.icon}>
            <SearchIcon />
          </View>
          {inputText.length > 0 && (
            <View style={styles.delete}>
              <InputDeleteButton onPress={handleClear} />
            </View>
          )}
        </View>
      ),
      headerRight: () => (
        <View style={{marginLeft: 16}}>
          <TouchableHighlight
            style={{
              width: 28,
              borderRadius: 20,
              alignItems: 'center',
              height: 40,
              justifyContent: 'center',
              // backgroundColor: 'blue',
            }}
            underlayColor="#EEEEEE"
            onPress={() => navigation.goBack()}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Pretendard-Medium',
                color: '#3a424e',
                // backgroundColor: 'red',
              }}>
              취소
            </Text>
          </TouchableHighlight>
        </View>
      ),
      headerBackVisible: false,
    });
  }, [inputText, navigation]);

  return (
    <>
      {
        <Tab.Navigator
          initialRouteName="BoardSearch"
          screenOptions={{
            tabBarStyle: {
              backgroundColor: '#FFFFFF',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 5},
              shadowRadius: 20,
            },
            tabBarIndicatorStyle: {
              backgroundColor: '#A055FF',
              height: 3,
              width: '50%',
              //bottom: -4,
              //borderRadius: 10,
              //marginHorizontal: tabWidth,
            },
            tabBarShowLabel: true,
            tabBarLabelStyle: {
              fontFamily: 'Pretendard-Bold',
              backgroundColor: '#FFFFFF',
              fontSize: 16,
              fontWeight: '700',
              justifyContent: 'center',
              alignContent: 'center',
            },
            tabBarActiveTintColor: '#222222',
            tabBarInactiveTintColor: '#9DA4AB',
          }}
          keyboardDismissMode="on-drag"
          initialLayout={{width: Dimensions.get('window').width}}>
          {/* 게시판 */}
          <Tab.Screen
            name="광산"
            component={() => <PostSearchResult searchWord={searchWord} />}
            initialParams={{searchWord: searchWord}}
          />
          {/* 게시글 */}
          <Tab.Screen
            name="수정구"
            children={() => <CrystalSearchResult searchWord={searchWord} />}
            initialParams={{searchWord: searchWord}}
          />
          {/* <Tab.Screen name="태그" component={TagSearchResult} /> */}
        </Tab.Navigator>
      }
    </>
  );
}

export default TotalSearchResult;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#F6F6F6',
    width: Dimensions.get('window').width - 75,
    height: 35,
    borderRadius: 8,
    paddingLeft: 40,
    paddingVertical: 8,
    fontSize: 16,
    fontWeight: 'normal',
    color: '#222222',
  },
  icon: {
    position: 'absolute',
    top: 6,
    left: 12,
  },
  delete: {
    position: 'absolute',
    top: 8,
    right: 12,
  },
  title: {
    color: '#222222',
    fontSize: 17,
    marginTop: 20,
  },
});
