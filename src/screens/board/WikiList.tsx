import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PostContent} from '../../classes/Search';
import {fontRegular} from '../../common/font';
import {getPostSearch} from '../../common/SearchApi';
import FloatingWriteButton from '../../components/FloatingWriteButton';
import PostSearchItem from '../../components/PostSearchItem';

function WikiList({data}: any) {
  const navigation = useNavigation();
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [isData, setIsData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    if (data) {
      setIsData(data);
      setIsLoading(false);
    }
  }, []);

  const moveToPost = (postId: number) => {
    navigation.navigate('PostScreen', {postId: postId});
  };

  useEffect(() => {
    const sortData = async () => {
      setIsLoading(true);
      // let newData = await getPostSearch(searchWord, 0, sortBy);
      // if (newData) {
      //   setIsData(newData);
      //   setIsLoading(false);
      // }
    };
    sortData();
  }, [sortBy]);

  if (isData.length <= 0) {
    return (
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}>
        <ActivityIndicator
          size="large"
          color={'#A055FF'}
          animating={isLoading}
          style={{zIndex: 100}}
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.noResult}>
        {isData.totalElements === 0 ? (
          <Text style={[fontRegular, styles.noResultText]}>
            요청하신 검색어에 대한 검색 결과가 없습니다.
          </Text>
        ) : (
          <ScrollView style={{backgroundColor: '#fff'}}>
            <View style={{backgroundColor: '#fff'}}>
              <TouchableOpacity
                onPress={() => {
                  if (sortBy === 'createdAt') {
                    setSortBy('likeCount');
                  } else {
                    setSortBy('createdAt');
                  }
                }}
                style={{
                  marginLeft: 24,
                  marginBottom: 10,
                  marginTop: 16,
                  width: 66,
                  height: 24,
                  backgroundColor: '#f6f6f6',
                  borderRadius: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text>{sortBy === 'createdAt' ? '최신순' : '공감순'}</Text>
              </TouchableOpacity>
            </View>
            {isData.content.map((item: PostContent, index: number) => (
              <PostSearchItem moveToPost={moveToPost} key={index} post={item} />
            ))}
          </ScrollView>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  noResult: {
    width: '100%',
    flex: 1,
    backgroundColor: 'rgb(244, 244, 244)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#6E7882',
  },
});

export default WikiList;
