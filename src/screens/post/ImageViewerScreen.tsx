import React, { useEffect, useState } from "react";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ImageViewer from "react-native-image-zoom-viewer";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ActivityIndicator, Platform, Pressable, Text, TouchableOpacity, View } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import RNFetchBlob from "rn-fetch-blob";
import Toast from 'react-native-simple-toast';
import { WhiteCancelButton } from "../../../resources/icon/Cancel";
import DownloadIcon from "../../../resources/icon/DownloadIcon";
import { fontMedium } from "../../common/font";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  imageUrls: {url: string}[];
  index: number;
}

const ImageViewerScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [imageList, setImageList] = useState<{url: string}[]>([]);
  const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true);

  useEffect(() => {
    setImageList(route.params.imageUrls);
  }, []);

  const saveImage = (url: string) => {
    if (Platform.OS === 'android') {
      let newImgUri = url.lastIndexOf('/');
      let imageName = url.substring(newImgUri);

      let dirs = RNFetchBlob.fs.dirs;
      let path = dirs.PictureDir + '/수정광산/' + imageName;

      RNFetchBlob.config({
        fileCache: true,
        appendExt: 'png',
        indicator: true,
        IOSBackgroundTask: true,
        path: path,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: path,
          description: 'Image'
        },
  
      }).fetch("GET", url).then(res => {
        Toast.show('사진이 저장되었습니다.', Toast.SHORT);
      });
    } else {
      CameraRoll.saveToCameraRoll(url);
      Toast.show('사진이 저장되었습니다.', Toast.SHORT);
    }
  }
  
  return (
    <>
      <ImageViewer
        index={route.params.index}
        imageUrls={route.params.imageUrls}
        onCancel={() => {}}
        renderIndicator={() => <></>}
        renderHeader={(currentIndex) => (
          isHeaderVisible ? <View 
            style={{
              position: 'absolute',
              top: 0,
              flexDirection: 'row',
              width: '100%',
              height: Platform.OS === 'ios' ? 100 : 70,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              zIndex: 10,
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 28,
              paddingTop: Platform.OS === 'ios' ?  50 : 0
            }}
          >
            <Pressable hitSlop={20} onPress={() => navigation.goBack()}>
              <WhiteCancelButton />
            </Pressable>
            <Text style={[{color: '#ffffff', fontSize: 15}, fontMedium]}>{`${currentIndex + 1} / ${route.params.imageUrls.length}`}</Text>
            <Pressable hitSlop={20} onPress={() => {console.log("currentIndex:", currentIndex); saveImage(imageList[currentIndex].url)}}>
              <DownloadIcon />
            </Pressable>
          </View>
          :
          <></>
        )}
        saveToLocalByLongPress={false}
        loadingRender={() => (
          <View style={{position: 'absolute', alignItems: 'center', justifyContent: 'center', left: 0, right: 0, top: 0, bottom: 0}}>
            <ActivityIndicator size='large' color={'#A055FF'} animating={true} style={{zIndex: 100}} />
          </View>)
        }
        enableSwipeDown={true}
        onSwipeDown={() => navigation.goBack()}
        onClick={() => setIsHeaderVisible(!isHeaderVisible)}
        />
    </>
  )
}

export default ImageViewerScreen;