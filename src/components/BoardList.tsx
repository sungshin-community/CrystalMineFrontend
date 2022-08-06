import React, { useState } from 'react';

import { FlatList, View, Text, TouchableWithoutFeedback, TouchableOpacity, StyleSheet } from 'react-native';
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
  isInited: boolean;
}

export default function BoardList({ items, moveToBoard, search, isInited }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    !isInited ?
    pinnedSkeletonComponent
    :
    items != null && items.length > 0 ? items.map((item, index) => 
        <TouchableOpacity
          key={index}
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
            fontSize: 14,
            color: '#6E7882',
            fontFamily: 'SpoqaHanSansNeo-Regular',
          }}>
          고정된 게시판이 없습니다
        </Text>
      </View>
  );
}

export function OfficialBoardList({ items, onUpdate, moveToBoard, isInited }: Props) {
  const [value, setValue] = useState<boolean>(false);
  return (
    !isInited ?
    boardSkeletonComponent
    :
    items != null && items.length > 0 ? items.map((item, index) => 
      <TouchableOpacity
        key={index}
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

export function CustomBoardList({ items, onUpdate, moveToBoard, isInited }: Props) {
  const [value, setValue] = useState<boolean>(false);
  return (
    items != null && items.length > 0 ? items.map((item, index) => 
          <TouchableOpacity
            key={index}
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
          height: 40,
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
          height: 40,
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
          height: 40,
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
const styles = StyleSheet.create({
  pinnedSkeletonRow: {
    flexDirection: 'row',
    alignItems: 'center', 
    height: 40, 
    backgroundColor: '#F6F6F6'
  },
  skeletonPin: {
    width: 14, 
    height: 14, 
    backgroundColor: '#E1E4EA', 
    marginLeft: 22
  },
  skeletonPinBoardName: {
    height: 14, 
    backgroundColor: '#E1E4EA', 
    marginLeft: 14
  },
  skeletonBoardName: {
    height: 12, 
    backgroundColor: '#E1E4EA', 
    marginLeft: 14
  },
  skeletonDescriptionName: {
    height: 10, 
    backgroundColor: '#E1E4EA', 
    marginLeft: 14,
    marginTop: 12
  },
  skeletonRow: {
    flexDirection: 'row',
    paddingVertical: 11,
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
  }
});


const pinnedSkeletonComponent = <View>
  <View style={styles.pinnedSkeletonRow}>
    <View style={styles.skeletonPin}></View>
    <View style={[styles.skeletonPinBoardName, {width: 87}]}></View>
  </View>
  <View style={{flexDirection: 'row', alignItems: 'center', height: 40, backgroundColor: '#F6F6F6'}}>
    <View style={styles.skeletonPin}></View>
    <View style={[styles.skeletonPinBoardName, {width: 124}]}></View>
  </View>
  <View style={{flexDirection: 'row', alignItems: 'center', height: 40, backgroundColor: '#F6F6F6'}}>
    <View style={styles.skeletonPin}></View>
    <View style={[styles.skeletonPinBoardName, {width: 103}]}></View>
  </View>
  <View style={{flexDirection: 'row', alignItems: 'center', height: 40, backgroundColor: '#F6F6F6'}}>
    <View style={styles.skeletonPin}></View>
    <View style={[styles.skeletonPinBoardName, {width: 87}]}></View>
  </View>
  <View style={{flexDirection: 'row', alignItems: 'center', height: 40, backgroundColor: '#F6F6F6'}}>
    <View style={styles.skeletonPin}></View>
    <View style={[styles.skeletonPinBoardName, {width: 116}]}></View>
  </View>
</View>

const boardSkeletonComponent = <View>
  <View style={styles.skeletonRow}>
    <View style={styles.skeletonPin}/>
    <View style={{flex: 1}}>
        <View style={[styles.skeletonBoardName, {width: 76}]}></View>
        <View style={[styles.skeletonDescriptionName, {width: 176}]}></View>
    </View>
  </View>
  <View style={styles.skeletonRow}>
    <View style={styles.skeletonPin}/>
    <View style={{flex: 1}}>
        <View style={[styles.skeletonBoardName, {width: 44}]}></View>
        <View style={[styles.skeletonDescriptionName, {width: 206}]}></View>
    </View>
  </View>
  <View style={styles.skeletonRow}>
    <View style={styles.skeletonPin}/>
    <View style={{flex: 1}}>
        <View style={[styles.skeletonBoardName, {width: 69}]}></View>
        <View style={[styles.skeletonDescriptionName, {width: 209}]}></View>
    </View>
  </View>
  <View style={styles.skeletonRow}>
    <View style={styles.skeletonPin}/>
    <View style={{flex: 1}}>
        <View style={[styles.skeletonBoardName, {width: 56}]}></View>
        <View style={[styles.skeletonDescriptionName, {width: 168}]}></View>
    </View>
  </View>
  <View style={styles.skeletonRow}>
    <View style={styles.skeletonPin}/>
    <View style={{flex: 1}}>
        <View style={[styles.skeletonBoardName, {width: 75}]}></View>
        <View style={[styles.skeletonDescriptionName, {width: 201}]}></View>
    </View>
  </View>
  <View style={styles.skeletonRow}>
    <View style={styles.skeletonPin}/>
    <View style={{flex: 1}}>
        <View style={[styles.skeletonBoardName, {width: 83}]}></View>
        <View style={[styles.skeletonDescriptionName, {width: 165}]}></View>
    </View>
  </View>
</View>