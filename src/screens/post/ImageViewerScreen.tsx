import React, { useState } from "react";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ImageViewer from "react-native-image-zoom-viewer";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Text } from "react-native";

interface Props {
  imageUrls: string[];
  index: number;
}

const ImageViewerScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <>
      <ImageViewer
        index={route.params.index}
        imageUrls={route.params.imageUrls}
        onCancel={() => {}}
        enableSwipeDown
      />
    </>
  )
}

export default ImageViewerScreen;