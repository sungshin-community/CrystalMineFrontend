import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';

import Scrap, {NoScrap} from '../../resources/icon/Scrap';
import PostDto from '../classes/PostDto';
import {fontMedium, fontRegular} from '../common/font';
import {SmallOrangeFlag} from '../../resources/icon/SmallOrangeFlag';
import Autolink from 'react-native-autolink';
import {SmallPurpleFlag} from '../../resources/icon/SmallPurpleFlag';

interface Props {
  navigation: any;
  post: any;
  handlePostLike: any;
  handlePostScrap: any;
  handlePostDelete?: any;
  handlePostReport?: any;
  componentModalVisible?: boolean;
  setComponentModalVisible?: any;
}

function AdminPost({navigation, post, handlePostScrap}: Props) {
  const data: PostDto = post;
  const [isPhotoVisible, setIsPhotoVisible] = useState<boolean>(false);

  const imgUrlCoverting = (arr: string[]) => {
    const array = arr.map(url => {
      return {url: url};
    });
    return array;
  };

  const handlePostScrapComponent = (
    <View style={{marginRight: 16}}>
      <Pressable hitSlop={10} onPress={() => handlePostScrap(data.postId)}>
        {data?.isScraped ? <Scrap /> : <NoScrap />}
      </Pressable>
    </View>
  );

  return (
    <>
      <View style={styles.postContainer}>
        <View style={styles.postHeader}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{width: 24, height: 24, borderRadius: 12}}
              source={{uri: data?.profileImage}}
            />
            <View style={{justifyContent: 'center'}}>
              <Text
                style={[
                  fontMedium,
                  {fontSize: 16, paddingLeft: 8, fontWeight: `500`},
                ]}>
                {data?.displayName}
              </Text>
            </View>
            {!data?.isAnonymous &&
              data?.isOwner &&
              (data.boardType === 'PUBLIC' ? (
                <SmallOrangeFlag style={{marginLeft: 5}} />
              ) : (
                <SmallPurpleFlag style={{marginLeft: 5}} />
              ))}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 0,
              margin: 0,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {handlePostScrapComponent}
            </View>
          </View>
        </View>
        {data?.hasTitle && (
          <Text style={[fontMedium, {fontSize: 17, marginTop: 12}]}>
            {data?.title}
          </Text>
        )}
        <View style={styles.postBody}>
          <Text
            style={[
              fontRegular,
              {fontSize: 14, color: '#222222', lineHeight: 22.5},
            ]}>
            <Autolink text={data ? (data.content ? data.content : '') : ''} />
          </Text>
        </View>
        <Text
          style={[
            fontRegular,
            {color: '#949494', fontSize: 12, marginTop: 12},
          ]}>
          {data?.createdAt}
        </Text>
        {data?.thumbnails.length !== 0 && (
          <View style={{flexDirection: 'row', marginTop: 16}}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}>
              {data?.thumbnails.map((url, index) => (
                <Pressable
                  key={index}
                  onPress={() =>
                    navigation.navigate('ImageViewerScreen', {
                      imageUrls: imgUrlCoverting(data.images),
                      index: index,
                    })
                  }>
                  <Image
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 10,
                      marginRight: 16,
                    }}
                    source={{uri: url}}
                  />
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    paddingHorizontal: 24,
    paddingTop: 18,
    marginBottom: 6,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postBody: {
    marginTop: 15,
  },
  postLike: {
    fontSize: 13,
    marginLeft: 5,
    marginRight: 11,
  },
  postComment: {
    fontSize: 13,
    marginLeft: 5,
    width: 35,
  },
});

export default AdminPost;
