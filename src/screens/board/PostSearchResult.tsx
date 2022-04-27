import React from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {ContentPreviewDto} from '../../classes/BoardDetailDto';
import PostItem from '../../components/PostItem';

function PostSearchResult() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView>
        <ScrollView>
          <View>
            {/* <FlatList
              data={dummyData}
              renderItem={({post}: Post) => <PostList post={post} />}
            /> */}
            {/* {dummyData.map((post: ContentPreviewDto, index: number) => (
              <PostItem key={index} post={post} />
            ))} */}
          </View>
        </ScrollView>
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
});

export default PostSearchResult;
