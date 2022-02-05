import React, {useState} from 'react';

import {FlatList, View, Text, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import MyPostingIcon, {
  MyCommentIcon,
  ScrapPostingIcon,
} from '../../resources/icon/MyPostingIcon';
import {GrayPin, OrangePin, PurplePin} from '../../resources/icon/Pin';
import PlusIcon from '../../resources/icon/PlusIcon';
import Board from '../classes/Board';
import {toggleBoardPin} from '../common/boardApi';

interface Props {
  items: Board[];
}

export default function BoardList({items}: Props) {
  return (
    items.length > 0 ? <FlatList
      data={items}
      renderItem={({item}) => (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            paddingVertical: 9,
            alignItems: 'center',
            backgroundColor: '#F6F6F6',
          }}>
          {!item.isPinned ? (
            <GrayPin style={{marginLeft: 20}} />
          ) : item.isOfficial ? (
            <OrangePin style={{marginLeft: 20}} />
          ) : (
            <PurplePin style={{marginLeft: 20}} />
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
        </TouchableOpacity>
      )}
    /> :
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

export function OfficialBoardList({items}: Props) {
  const [value, setValue] = useState<boolean>(false);
  return (
    <View>
      <FlatList
        data={items}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              paddingVertical: 9,
              alignItems: 'center',
              backgroundColor: '#F6F6F6',
            }}>
            {!item.isPinned ? (
              <GrayPin
                style={{marginLeft: 20}}
                onPress={async () => {
                  let result: boolean = await toggleBoardPin(item.id);
                  if (result) {
                    item.isPinned = true;
                    setValue(!value);
                  }
                }}
              />
            ) : (
              <OrangePin
                style={{marginLeft: 20}}
                onPress={async () => {
                  let result: boolean = await toggleBoardPin(item.id);
                  if (result) {
                    item.isPinned = false;
                    setValue(!value);
                  }
                }}
              />
            )}
            <View>
              <Text
                style={{
                  fontSize: 15,
                  color: '#000000',
                  marginLeft: 15,
                  fontFamily: 'SpoqaHanSansNeo-Regular',
                }}>
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#9F9F9F',
                  marginLeft: 15,
                  fontFamily: 'SpoqaHanSansNeo-Regular',
                }}>
                {item.introduction}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export function OfficialBoardListTest({items}: Props) {
  const [value, setValue] = useState<boolean>(false);
  return (
    <View>
      <FlatList
        data={items}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              paddingVertical: 11,
              alignItems: 'center',
              backgroundColor: '#F6F6F6',
            }}>
            {!item.isPinned ? (
              <GrayPin
                style={{marginLeft: 20}}
                onPress={async () => {
                  let result: boolean = await toggleBoardPin(item.id);
                  if (result) {
                    item.isPinned = true;
                    setValue(!value);
                  }
                }}
              />
            ) : (
              <OrangePin
                style={{marginLeft: 20}}
                onPress={async () => {
                  let result: boolean = await toggleBoardPin(item.id);
                  if (result) {
                    item.isPinned = false;
                    setValue(!value);
                  }
                }}
              />
            )}
            <View>
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
                style={{
                  fontSize: 14,
                  color: '#9F9F9F',
                  marginLeft: 15,
                  fontFamily: 'SpoqaHanSansNeo-Regular',
                }}>
                {item.introduction}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export function CustomBoardList({items}: Props) {
  const [value, setValue] = useState<boolean>(false);
  return (
    <View>
      <TouchableWithoutFeedback onPress={() => console.log('눌림')}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#F6F6F6',
          }}>
          <PlusIcon style={{marginLeft: 20}} />
          <Text
            style={{
              color: '#ADADAD',
              fontSize: 15,
              fontFamily: 'SpoqaHanSansNeo-Regular',
            }}>
            새 게시판 만들기
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <FlatList
        data={items}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              paddingVertical: 11,
              alignItems: 'center',
              backgroundColor: '#F6F6F6',
            }}>
            {!item.isPinned ? (
              <GrayPin
                style={{marginLeft: 20}}
                onPress={async () => {
                  let result: boolean = await toggleBoardPin(item.id);
                  if (result) {
                    item.isPinned = true;
                    setValue(!value);
                  }
                }}
              />
            ) : (
              <PurplePin
                style={{marginLeft: 20}}
                onPress={async () => {
                  let result: boolean = await toggleBoardPin(item.id);
                  if (result) {
                    item.isPinned = false;
                    setValue(!value);
                  }
                }}
              />
            )}
            <View>
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
                style={{
                  fontSize: 14,
                  color: '#9F9F9F',
                  marginLeft: 15,
                  fontFamily: 'SpoqaHanSansNeo-Regular',
                }}>
                {item.introduction}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export function MenuList() {
  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          height: 36,
          alignItems: 'center',
          backgroundColor: '#F6F6F6',
        }}>
        <MyPostingIcon style={{marginLeft: 20}} />
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
        style={{
          flexDirection: 'row',
          height: 36,
          alignItems: 'center',
          backgroundColor: '#F6F6F6',
        }}>
        <MyCommentIcon style={{marginLeft: 20}} />
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
        style={{
          flexDirection: 'row',
          height: 36,
          alignItems: 'center',
          backgroundColor: '#F6F6F6',
        }}>
        <ScrapPostingIcon style={{marginLeft: 20}} />
        <Text
          style={{
            fontSize: 14,
            color: '#000000',
            marginLeft: 15,
            fontFamily: 'SpoqaHanSansNeo-Regular',
          }}>
          스크랩
        </Text>
      </TouchableOpacity>
    </>
  );
}
