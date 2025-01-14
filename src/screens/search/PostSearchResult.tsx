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
import SearchIcon from '../../../resources/icon/SearchIcon';
import TagSearchResult from '../board/TagSearchResult';
import CancelButton from '../../../resources/icon/Cancel';
import {fontBold, fontRegular} from '../../common/font';
import PostList from './PostList';
import {saveRecentSearchWord} from '../../common/util/recentSearchWordsUtil';
import InputDeleteButton from './total/InputDeleteButton';

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
let tabWidth = (Dimensions.get('window').width / 2 - 24) / 2;

function PostSearchResult({navigation, route}: Props) {
  const [searchWord, setSearchWord] = useState<string>(
    route.params.searchWord || '',
  );
  const boardName = route.params.boardName ? route.params.boardName : '';
  const inputRef = useRef<TextInput>(null);

  const search = (text: string) => {
    setSearchWord(text);
    saveRecentSearchWord(text, 'recentPostSearch' + route.params.boardId);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: (): React.ReactNode => (
        <View style={styles.container}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            /* placeholder={`[${
              boardName.length <= 5
                ? boardName
                : boardName.substring(0, 5) + '...'
            }] 게시판에서 검색`} */
            placeholder="검색"
            placeholderTextColor="#898989"
            returnKeyType="search"
            autoCorrect={false}
            autoCapitalize="none"
            onSubmitEditing={e => {
              search(e.nativeEvent.text);
            }}
            keyboardType="default"
            enablesReturnKeyAutomatically
            value={searchWord}
            onChangeText={setSearchWord}
            //defaultValue={route.params.searchWord}
          />
          <View style={styles.icon}>
            <SearchIcon />
          </View>
          <View style={styles.delete}>
            <InputDeleteButton
              onPress={() => {
                setSearchWord('');
                inputRef.current?.focus();
              }}
            />
          </View>
        </View>
      ),
      headerRight: (): React.ReactNode => (
        <View style={{marginLeft: 16}}>
          <TouchableHighlight
            style={{
              width: 35,
              borderRadius: 20,
              alignItems: 'center',
              height: 40,
              justifyContent: 'center',
            }}
            underlayColor="#EEEEEE"
            onPress={() => {
              navigation.goBack();
            }}>
            <Text
              style={[
                fontRegular,
                {
                  fontSize: 16,
                  fontFamily: 'Pretendard-Medium',
                  color: '#3a424e',
                },
              ]}>
              취소
            </Text>
          </TouchableHighlight>
        </View>
      ),
    });
  }, [navigation, searchWord]);

  return (
    <>
      <View style={{flex: 1}}>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#EFEFF3',
          }}
        />
        <PostList
          searchWord={searchWord}
          boardId={route.params.boardId}
          boardName={route.params.boardName}
        />
      </View>
    </>
  );
}

export default PostSearchResult;

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
    fontFamily: 'Pretendard-Regular',
    fontWeight: 'normal',
    fontSize: 16,
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
