import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GrayPin, OwnerPin, PurplePin} from '../../resources/icon/Pin';
import {fontRegular} from '../common/font';

interface Props {
  item: {
    id: number;
    name: string;
    introduction: string;
    isOwner: boolean;
    isPinned: boolean;
  };
}

function SearchResultBoardItem({item}: Props) {
  console.log('SearchResultBoardItem ::: ', item);
  return (
    <View style={styles.container}>
      <View>
        {item.isOwner && item.isPinned ? (
          <OwnerPin />
        ) : item.isPinned ? (
          <PurplePin />
        ) : (
          <GrayPin />
        )}
        <Text style={[fontRegular]}>{item.name}</Text>
      </View>
      <Text style={[fontRegular]}>{item.introduction}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

export default SearchResultBoardItem;
