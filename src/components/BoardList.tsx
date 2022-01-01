import React, { useState } from 'react';

import {
    ScrollView,
    FlatList,
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';
import MyPostingIcon, {MyCommentIcon, ScrapPostingIcon} from '../../resources/icon/MyPostingIcon';
import { GrayPin, OrangePin, PurplePin } from '../../resources/icon/Pin';
import PlusIcon from '../../resources/icon/PlusIcon';
import Board from '../classes/Board'

interface Props {
    items: Board[];
}

export default function BoardList({items}: Props) {
  return (
    <FlatList
      data={items}
      renderItem={({item})=><View style={{flexDirection: 'row', paddingVertical: 11, alignItems: 'center', backgroundColor: '#F6F6F6'}}>
          {!item.isPinned ? <GrayPin style={{marginLeft: 25}} /> : item.isOfficial ? <OrangePin style={{marginLeft: 25}} /> : <PurplePin style={{marginLeft: 25}} />}
          <Text style={{fontSize: 14, color: '#000000', marginLeft: 15}}>{item.name}</Text>
        </View>}
    />
  )
}

export function OfficialBoardList({items}: Props) {
    return (
      <View>
        <FlatList
          data={items}
          renderItem={({item})=><View style={{flexDirection: 'row', paddingVertical: 11, alignItems: 'center', backgroundColor: '#F6F6F6'}}>
            {!item.isPinned ? <GrayPin style={{marginLeft: 25}} /> : <OrangePin style={{marginLeft: 25}} />}
            <View>
              <Text style={{fontSize: 14, color: '#000000', marginLeft: 15}}>{item.name}</Text>
              <Text style={{fontSize: 14, color: '#9F9F9F', marginLeft: 15}}>{item.introduction}</Text>
            </View>
          </View>}
        />
      </View>
    )
  }

export function CustomBoardList({items}: Props) {
  return (
    <View>
      <TouchableWithoutFeedback onPress={() => console.log("눌림")}>
        <View style={{flexDirection: 'row', alignItems: 'center', 'backgroundColor': '#F6F6F6'}}>
          <PlusIcon style={{marginLeft: 20}} />
          <Text style={{color: '#ADADAD', fontSize: 15}}>새 게시판 만들기</Text>
        </View>
      </TouchableWithoutFeedback>
      <FlatList
        data={items}
        renderItem={({item})=><View style={{flexDirection: 'row', paddingVertical: 11, alignItems: 'center', backgroundColor: '#F6F6F6'}}>
          {!item.isPinned ? <GrayPin style={{marginLeft: 25}} /> : item.isOfficial ? <OrangePin style={{marginLeft: 25}} /> : <PurplePin style={{marginLeft: 25}} />}
          <View>
            <Text style={{fontSize: 14, color: '#000000', marginLeft: 15}}>{item.name}</Text>
            <Text style={{fontSize: 14, color: '#9F9F9F', marginLeft: 15}}>{item.introduction}</Text>
          </View>
        </View>}
      />
    </View>
  )
}

export function MenuList() {
  return (
    <>
      <View style={{flexDirection: 'row', paddingVertical: 11, alignItems: 'center', backgroundColor: '#F6F6F6'}}>
        <MyPostingIcon style={{marginLeft: 20}} />
        <Text style={{fontSize: 14, color: '#000000', marginLeft: 15}}>내가 작성한 글</Text>
      </View>
      <View style={{flexDirection: 'row', paddingVertical: 11, alignItems: 'center', backgroundColor: '#F6F6F6'}}>
        <MyCommentIcon style={{marginLeft: 20}} />
        <Text style={{fontSize: 14, color: '#000000', marginLeft: 15}}>내가 작성한 댓글</Text>
      </View>
      <View style={{flexDirection: 'row', paddingVertical: 11, alignItems: 'center', backgroundColor: '#F6F6F6'}}>
        <ScrapPostingIcon style={{marginLeft: 20}} />
        <Text style={{fontSize: 14, color: '#000000', marginLeft: 15}}>스크랩</Text>
      </View>
    </>
    )
}