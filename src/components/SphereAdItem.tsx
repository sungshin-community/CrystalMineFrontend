import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {pantheonList} from '../classes/Pantheon';

interface SphereAdItemProps {
  post: {
    title: string;
    content: string;
    thumbnail: string;
    storeName: string;
    imageCount: number;
    postAdId: number;
  };
}

type RootStackParamList = {
  PostScreen: {
    postId: number;
    boardId: number;
  };
};

export default function SphereAdItem({post}: SphereAdItemProps) {
  const navigation =
    useNavigation<NativeStackScreenProps<RootStackParamList>['navigation']>();

  return (
    <View style={{paddingHorizontal: 16}}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('PostScreen', {
            postId: post.postAdId,
            boardId: 98,
          });
        }}>
        {typeof post.title === 'string' && (
          <Text
            style={{
              color: '#222222',
              fontSize: 16,
              fontWeight: '600',
              marginBottom: 8,
            }}
            numberOfLines={1}
            ellipsizeMode="tail">
            {post.title}
          </Text>
        )}

        <View
          style={{
            flexDirection: 'row',
            flex: 1,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: '#222222',
              flex: 1,
            }}>
            {post.content.length > 85 ? (
              <>
                {post.content.slice(0, 82)}...
                <Text style={{color: '#9DA4AB'}}> 더보기</Text>
              </>
            ) : (
              post.content
            )}
          </Text>

          {typeof post.thumbnail === 'string' && (
            <View style={{marginLeft: 8}}>
              <Image
                source={{uri: post.thumbnail}}
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 8,
                }}
                resizeMode="cover"
              />
              {post.imageCount > 1 && (
                <Text
                  style={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    color: 'white',
                    fontSize: 10,
                    fontWeight: '500',
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderRadius: 10,
                    overflow: 'hidden',
                  }}>
                  {`+${post.imageCount - 1}`}
                </Text>
              )}
            </View>
          )}
        </View>

        <View
          style={{alignItems: 'center', marginTop: 12, flexDirection: 'row'}}>
          <Text style={styles.footerAd}>AD</Text>
          <Text style={styles.footerText}>{post.storeName}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footerText: {
    fontWeight: '500',
    fontSize: 12,
    color: '#9DA4AB',
  },
  footerAd: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    backgroundColor: '#F6F6F6',
    color: '#9DA4AB',
    fontSize: 12,
    fontWeight: '500',
    marginRight: 10,
    borderRadius: 4,
  },
});
