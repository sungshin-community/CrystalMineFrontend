import React, { useState } from 'react';

import { FlatList, View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import GrayFlag from '../../resources/icon/GrayFlag';
import MyPostingIcon, {
  MyCommentIcon,
  ScrapPostingIcon,
} from '../../resources/icon/MyPostingIcon';
import OrangeFlag from '../../resources/icon/OrangeFlag';
import { GrayPin, OrangePin, PurplePin } from '../../resources/icon/Pin';
import PlusIcon from '../../resources/icon/PlusIcon';
import Board from '../classes/Board';
import { toggleBoardPin } from '../common/boardApi';
import { fontRegular } from '../common/font';

interface Props {
  items: Board[];
  onUpdate?: () => void;
  moveToBoard?: (boardId: number) => void;
  search?: boolean;
}

export default function BoardList({ items, moveToBoard, search }: Props) {
  return (
    items != null && items.length > 0 ? items.map(item => 
        <TouchableOpacity
          onPress={() => moveToBoard(item.id)}
          style={{
            paddingVertical: 9,
            backgroundColor: `${search ? '#fff' : '#F6F6F6'}`,
          }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            {!item.isPinned ? (
              item.isOwner ? <GrayFlag style={{ marginLeft: 23 }} /> : <GrayPin style={{ marginLeft: 20 }} />
            ) : item.isOfficial ? (
              <PurplePin style={{ marginLeft: 20 }} />
            ) : (
              item.isOwner ? <OrangeFlag style={{ marginLeft: 23 }} /> : <OrangePin style={{ marginLeft: 20 }} />
            )}
            <Text
              style={{
                fontSize: 15,
                color: '#000000',
                marginLeft: 15,
                fontFamily: 'SpoqaHanSansNeo-Regular',
              }}>
              {item.name}
            </Text>
          </View>
          {search && (
            <View>
              <Text style={[fontRegular, { color: '#BDBDBD', marginLeft: 60, fontSize: 13, marginTop: 6, paddingRight: 20 }]}>{item.introduction}</Text>
            </View>
          )}
        </TouchableOpacity>
      )
     :
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#F6F6F6',
          paddingVertical: 10
        }}
      >
        <Text
          style={{
            fontSize: 15,
            color: '#6E7882',
            fontFamily: 'SpoqaHanSansNeo-Regular',
          }}>
          고정된 게시판이 없습니다
        </Text>
      </View>
  );
}

export function OfficialBoardList({ items, onUpdate, moveToBoard }: Props) {
  const [value, setValue] = useState<boolean>(false);
  return (
    items != null && items.length > 0 ? items.map(item => 
      <TouchableOpacity
        onPress={() => moveToBoard(item.id)}
        style={{
          flexDirection: 'row',
          paddingVertical: 11,
          alignItems: 'center',
          backgroundColor: '#F6F6F6',
        }}>
        {!item.isPinned ? (
          <GrayPin
            style={{ marginLeft: 20 }}
            onPress={async () => {
              let result: boolean = await toggleBoardPin(item.id);
              if (result) {
                item.isPinned = true;
                setValue(!value);
                onUpdate();
              }
            }}
          />
        ) : (
          <PurplePin
            style={{ marginLeft: 20 }}
            onPress={async () => {
              let result: boolean = await toggleBoardPin(item.id);
              if (result) {
                item.isPinned = false;
                setValue(!value);
                onUpdate();
              }
            }}
          />
        )}
        <View style={{flex: 1}}>
          <Text
            style={{
              fontSize: 14,
              color: '#000000',
              marginLeft: 15,
              fontFamily: 'SpoqaHanSansNeo-Regular',
            }}>
            {item.name}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: 14,
              color: '#9F9F9F',
              marginLeft: 15,
              marginRight: 15,
              fontFamily: 'SpoqaHanSansNeo-Regular',
            }}>
            {item.introduction}
          </Text>
        </View>
      </TouchableOpacity>
    )
    :
    <View
        style={{
          alignItems: 'center',
          backgroundColor: '#F6F6F6',
          paddingVertical: 10
        }}
      >
        <Text
          style={{
            fontSize: 15,
            color: '#6E7882',
            fontFamily: 'SpoqaHanSansNeo-Regular',
          }}>
          생성된 공식 게시판이 없습니다
        </Text>
      </View>
  )
}

export function CustomBoardList({ items, onUpdate, moveToBoard }: Props) {
  const [value, setValue] = useState<boolean>(false);
  return (
    items != null && items.length > 0 ? items.map(item => 
          <TouchableOpacity
            onPress={() => moveToBoard(item.id)}
            style={{
              flexDirection: 'row',
              paddingVertical: 11,
              alignItems: 'center',
              backgroundColor: '#F6F6F6',
            }}>
            {!item.isPinned ? (
              item.isOwner ? <GrayFlag style={{ marginLeft: 23 }}
                onPress={async () => {
                  let result: boolean = await toggleBoardPin(item.id);
                  if (result) {
                    item.isPinned = true;
                    setValue(!value);
                    onUpdate();
                  }
                }} /> : <GrayPin
                style={{ marginLeft: 20 }}
                onPress={async () => {
                  let result: boolean = await toggleBoardPin(item.id);
                  if (result) {
                    item.isPinned = true;
                    setValue(!value);
                    onUpdate();
                  }
                }}
              />
            ) : (
              item.isOwner ? <OrangeFlag style={{ marginLeft: 23 }}
                onPress={async () => {
                  let result: boolean = await toggleBoardPin(item.id);
                  if (result) {
                    item.isPinned = false;
                    setValue(!value);
                    onUpdate();
                  }
                }} /> : <OrangePin
                style={{ marginLeft: 20 }}
                onPress={async () => {
                  let result: boolean = await toggleBoardPin(item.id);
                  if (result) {
                    item.isPinned = false;
                    setValue(!value);
                    onUpdate();
                  }
                }}
              />
            )}
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#000000',
                  marginLeft: 15,
                  fontFamily: 'SpoqaHanSansNeo-Regular',
                }}>
                {item.name}
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontSize: 14,
                  color: '#9F9F9F',
                  marginLeft: 15,
                  marginRight: 15,
                  fontFamily: 'SpoqaHanSansNeo-Regular',
                }}>
                {item.introduction}
              </Text>
            </View>
          </TouchableOpacity>

)
:
<View
    style={{
      alignItems: 'center',
      backgroundColor: '#F6F6F6',
      paddingVertical: 10
    }}
  >
    <Text
      style={{
        fontSize: 15,
        color: '#6E7882',
        fontFamily: 'SpoqaHanSansNeo-Regular',
      }}>
      생성된 수정 게시판이 없습니다
    </Text>
  </View>
  );
}

interface MenuProps {
  toMyPosting: () => void;
  toScrapedPosting: () => void;
  toMyCommentList: () => void;
}

export function MenuList({ toMyPosting, toMyCommentList, toScrapedPosting }: MenuProps) {
  return (
    <>
      <TouchableOpacity
        onPress={toMyPosting}
        style={{
          flexDirection: 'row',
          height: 36,
          alignItems: 'center',
          backgroundColor: '#F6F6F6',
        }}>
        <MyPostingIcon style={{ marginLeft: 20 }} />
        <Text
          style={{
            fontSize: 14,
            color: '#000000',
            marginLeft: 15,
            fontFamily: 'SpoqaHanSansNeo-Regular',
          }}>
          내가 작성한 글
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={toMyCommentList}
        style={{
          flexDirection: 'row',
          height: 36,
          alignItems: 'center',
          backgroundColor: '#F6F6F6',
        }}>
        <MyCommentIcon style={{ marginLeft: 20 }} />
        <Text
          style={{
            fontSize: 14,
            color: '#000000',
            marginLeft: 15,
            fontFamily: 'SpoqaHanSansNeo-Regular',
          }}>
          내가 작성한 댓글
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={toScrapedPosting}
        style={{
          flexDirection: 'row',
          height: 36,
          alignItems: 'center',
          backgroundColor: '#F6F6F6',
        }}>
        <ScrapPostingIcon style={{ marginLeft: 20 }} />
        <Text
          style={{
            fontSize: 14,
            color: '#000000',
            marginLeft: 15,
            fontFamily: 'SpoqaHanSansNeo-Regular',
          }}>
          내가 스크랩한 글
        </Text>
      </TouchableOpacity>
    </>
  );
}
