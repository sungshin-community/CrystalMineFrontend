import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {fontBold, fontMedium, fontRegular} from '../../../common/font';
import {NoticeDto} from '../../../classes/mypage/NoticeDto';
import {getNotice} from '../../../common/myPageApi';
import WaterMark from '../../../components/WaterMark';
import Autolink from 'react-native-autolink';
import {useNavigation} from '@react-navigation/native';

type RootStackParamList = {
  Notice: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

function Notice({route}: Props) {
  const navigation = useNavigation();
  const [data, setData] = useState<NoticeDto>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await getNotice(route.params?.noticeId);
      setData(response);
      setIsLoading(false);
    }
    getData();
  }, []);

  const imgUrlCoverting = (arr: string[]) => {
    const array = arr.map(url => {
      return {url: url};
    });
    return array;
  };

  return (
    <>
      <WaterMark />
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
      <ScrollView style={{backgroundColor: '#E5E5E5'}}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={[fontMedium, styles.title]}>{data?.title}</Text>
            {data?.isNew && (
              <View style={styles.newIcon}>
                <Text style={[fontBold, {color: '#FF6060', fontSize: 13}]}>
                  N
                </Text>
              </View>
            )}
          </View>
          <Text style={fontRegular}>
            <Autolink text={data ? (data.content ? data.content : '') : ''} />
          </Text>
          <Text
            style={[
              fontRegular,
              {color: '#ADB3BC', fontSize: 12, marginTop: 12},
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
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: 'white',
    paddingHorizontal: 24,
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 16,
  },
  newIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
  title: {
    fontSize: 15,
    color: '#222222',
    width: Dimensions.get('window').width - 70,
  },
});

export default Notice;
