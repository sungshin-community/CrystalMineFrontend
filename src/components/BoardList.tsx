import React, {useState} from 'react';

import {
  FlatList,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import GrayFlag from '../../resources/icon/GrayFlag';
import MyPostingIcon, {
  MyCommentIcon,
  ScrapPostingIcon,
} from '../../resources/icon/MyPostingIcon';
import OrangeFlag from '../../resources/icon/OrangeFlag';
import {DarkPin, GrayPin, OrangePin, PurplePin} from '../../resources/icon/Pin';
import PlusIcon from '../../resources/icon/PlusIcon';
import Board from '../classes/Board';
import {toggleBoardPin} from '../common/boardApi';
import {fontRegular} from '../common/font';
import {getHundredsDigit} from '../common/util/statusUtil';
import Toast from 'react-native-simple-toast';
import {useNavigation} from '@react-navigation/native';
import {logout} from '../common/authApi';
import {FoldButton, SpreadButton} from '../../resources/icon/Button';
import LinearGradient from 'react-native-linear-gradient';
import NewIcon from '../../resources/icon/NewIcon';

interface Props {
  items: Board[];
  onUpdate?: () => void;
  moveToBoard?: (boardId: number) => void;
  isInited: boolean;
}

export default function BoardList({
  items,
  moveToBoard,
  isInited,
  onUpdate,
}: Props) {
  const navigation = useNavigation();

  return !isInited ? (
    pinnedSkeletonComponent
  ) : items != null && items.length > 0 ? (
    items.map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => moveToBoard(item.id)}
        style={{
          flexDirection: 'row',
          height: 55,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <View style={{flex: 7, marginLeft: 15, marginRight: 5}}>
          <Text
            style={{
              fontSize: 14,
              color: '#3A424E',
              fontFamily: 'SpoqaHanSansNeo-Regular',
            }}>
            {item.name}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: 12,
              color: '#89919A',
              fontFamily: 'SpoqaHanSansNeo-Regular',
            }}>
            {item.introduction}
          </Text>
        </View>
        <View style={{flex: 1, marginRight: 10, marginLeft: 5}}>
          <Pressable
            onPress={async () => {
              if (item.id === 1) return;
              const response = await toggleBoardPin(item.id);
              if (response.status === 401) {
                setTimeout(function () {
                  Toast.show(
                    '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
                    Toast.SHORT,
                  );
                }, 100);
                logout();
                navigation.reset({routes: [{name: 'SplashHome'}]});
              } else if (getHundredsDigit(response.status) === 2) {
                onUpdate();
              } else {
                setTimeout(function () {
                  Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
                }, 100);
              }
            }}
            style={{
              height: 30,
              justifyContent: 'center',
              marginLeft: 10,
              width: 44,
            }}>
            {!item.isPinned ? (
              item.isOwner ? (
                <GrayFlag style={{marginRight: 13}} />
              ) : (
                <GrayPin style={{marginRight: 10}} />
              )
            ) : item.isOwner ? (
              <OrangeFlag style={{marginRight: 13}} />
            ) : (
              <OrangePin style={{marginRight: 10}} />
            )}
            <Text
              style={{
                fontSize: 12,
                color: '#A055FF',
                fontWeight: '500',
                fontFamily: 'SpoqaHanSansNeo-Regular',
              }}>
              999+
            </Text>
          </Pressable>
        </View>
      </TouchableOpacity>

      /* <TouchableOpacity
        key={index}
        onPress={() => moveToBoard(item.id)}
        style={{
          width: '100%',
          height: 44,
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
          marginBottom: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
          }}>
          <View style={{flex: 11}}>
            <Text
              style={{
                fontSize: 14,
                color: '#3A424E',
                fontFamily: 'SpoqaHanSansNeo-Regular',
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#89919A',
                fontFamily: 'SpoqaHanSansNeo-Regular',
              }}>
              {item.description || '해당 게시판 설명입니다.'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              height: 44,
              width: 31,
              flex: 1,
            }}>
            <Pressable
              style={{
                height: 24,
                justifyContent: 'center',
                alignItems: 'center',
                width: 24,
              }}
              onPress={async () => {
                if (item.id === 1) return;
                const response = await toggleBoardPin(item.id);
                if (response.status === 401) {
                  setTimeout(function () {
                    Toast.show(
                      '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
                      Toast.SHORT,
                    );
                  }, 100);
                  logout();
                  navigation.reset({routes: [{name: 'SplashHome'}]});
                } else if (getHundredsDigit(response.status) === 2) {
                  onUpdate();
                } else {
                  setTimeout(function () {
                    Toast.show(
                      '알 수 없는 오류가 발생하였습니다.',
                      Toast.SHORT,
                    );
                  }, 100);
                }
              }}>
              {item.type !== 'PUBLIC' ? (
                item.id === 1 ? (
                  <DarkPin style={{marginRight: 10}} />
                ) : (
                  <PurplePin style={{marginRight: 10}} />
                )
              ) : item.isOwner ? (
                <OrangeFlag style={{marginRight: 10}} />
              ) : (
                <OrangePin style={{marginRight: 10}} />
              )}
            </Pressable>
            <Text
              style={{
                fontSize: 12,
                color: '#A055FF',
                fontWeight: '500',
                fontFamily: 'SpoqaHanSansNeo-Regular',
              }}>
              999+
            </Text>
          </View>
        </View>
      </TouchableOpacity> */
    ))
  ) : (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
        paddingVertical: 10,
      }}>
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

export function OfficialBoardList({
  items,
  onUpdate,
  moveToBoard,
  isInited,
}: Props) {
  const navigation = useNavigation();

  return !isInited ? (
    boardSkeletonComponent
  ) : items != null && items.length > 0 ? (
    items.map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => moveToBoard(item.id)}
        style={{
          flexDirection: 'row',
          height: 45,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <View style={{flex: 1, marginLeft: 15, marginRight: 15}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 14,
                color: '#3A424E',
                fontFamily: 'SpoqaHanSansNeo-Regular',
                marginRight: 8,
              }}>
              {item.name}
            </Text>
            {item.todayNewPost && <NewIcon />}
            {/* <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: 14,
              color: '#9F9F9F',
              fontFamily: 'SpoqaHanSansNeo-Regular',
            }}>
            {item.introduction}
          </Text> */}
          </View>
        </View>
        <Pressable
          onPress={async () => {
            if (item.id === 1) return;
            console.log(item.id);
            const response = await toggleBoardPin(item.id);
            if (response.status === 401) {
              setTimeout(function () {
                Toast.show(
                  '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
                  Toast.SHORT,
                );
              }, 100);
              logout();
              navigation.reset({routes: [{name: 'SplashHome'}]});
            } else if (getHundredsDigit(response.status) === 2) {
              onUpdate();
            } else {
              setTimeout(function () {
                Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
              }, 100);
            }
          }}
          style={{
            height: 32,
            justifyContent: 'center',
            marginLeft: 10,
            width: 44,
          }}>
          {item.id === 1 ? (
            <DarkPin style={{marginLeft: 5}} />
          ) : !item.isPinned ? (
            <GrayPin style={{marginLeft: 5}} />
          ) : (
            <PurplePin style={{marginLeft: 5}} />
          )}
        </Pressable>
      </TouchableOpacity>
    ))
  ) : (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
        paddingVertical: 10,
      }}>
      <Text
        style={{
          fontSize: 15,
          color: '#6E7882',
          fontFamily: 'SpoqaHanSansNeo-Regular',
        }}>
        생성된 공식 게시판이 없습니다
      </Text>
    </View>
  );
}

export function CustomBoardList({
  items,
  onUpdate,
  moveToBoard,
  isInited,
  isExpanded,
}: Props) {
  const [value, setValue] = useState<boolean>(false);
  const navigation = useNavigation();
  const visibleItems = isExpanded ? items : items.slice(0, 5);

  return items != null && items.length > 0 ? (
    <>
      {visibleItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => moveToBoard(item.id)}
          style={{
            flexDirection: 'row',
            height: 55,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            //backgroundColor: '#A055FF',
          }}>
          <View style={{flex: 7, marginLeft: 15, marginRight: 5}}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#3A424E',
                  fontFamily: 'SpoqaHanSansNeo-Regular',
                  marginRight: 8,
                }}>
                {item.name}
              </Text>
              {item.todayNewPost && <NewIcon />}
            </View>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontSize: 12,
                color: '#89919A',
                fontFamily: 'SpoqaHanSansNeo-Regular',
              }}>
              {item.introduction}
            </Text>
          </View>
          <View style={{flex: 1, marginRight: 10, marginLeft: 5}}>
            <Pressable
              onPress={async () => {
                if (item.id === 1) return;
                const response = await toggleBoardPin(item.id);
                if (response.status === 401) {
                  setTimeout(function () {
                    Toast.show(
                      '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
                      Toast.SHORT,
                    );
                  }, 100);
                  logout();
                  navigation.reset({routes: [{name: 'SplashHome'}]});
                } else if (getHundredsDigit(response.status) === 2) {
                  onUpdate();
                } else {
                  setTimeout(function () {
                    Toast.show(
                      '알 수 없는 오류가 발생하였습니다.',
                      Toast.SHORT,
                    );
                  }, 100);
                }
              }}
              style={{
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 10,
                //width: 44,
              }}>
              {/* 게시판장인 경우 분리 문의 필요 */}
              {!item.isPinned ? (
                item.isOwner ? (
                  <GrayFlag />
                ) : (
                  <GrayPin />
                )
              ) : item.isOwner ? (
                <PurplePin />
              ) : (
                /* <OrangeFlag /> */
                <PurplePin />
                /* <OrangePin /> */
              )}
              <Text
                style={{
                  fontSize: 12,
                  color: '#A055FF',
                  fontWeight: '500',
                  fontFamily: 'SpoqaHanSansNeo-Regular',
                }}>
                {item.pinCount}
              </Text>
            </Pressable>
          </View>
          {index === 4 && !isExpanded && (
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 50,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              }}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)']} // 빨간색에서 투명으로 변화
                start={{x: 0.5, y: 1}}
                end={{x: 0.5, y: 0}}
                style={{
                  flex: 1,
                }}
              />
            </View>
          )}
        </TouchableOpacity>
      ))}
      {items.length > 5 && !isExpanded && (
        <View style={{position: 'relative'}}>
          <TouchableOpacity
            onPress={() => onUpdate({expand: true})}
            style={{alignItems: 'center', paddingVertical: 10}}>
            <View style={styles.overlay} />
            <View
              style={{
                zIndex: 99,
                width: 343,
                height: 44,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#E2E4E8',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#6E7882',
                  fontFamily: 'SpoqaHanSansNeo-Regular',
                }}>
                게시판 펼쳐보기 <SpreadButton />
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  ) : (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
        paddingVertical: 10,
      }}>
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

export function TeamBoardList({items, onUpdate, moveToBoard, isInited}: Props) {
  const [value, setValue] = useState<boolean>(false);
  const navigation = useNavigation();

  return items != null && items.length > 0 ? (
    items.map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => moveToBoard(item.id)}
        style={{
          flexDirection: 'row',
          height: 61,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F6F6F6',
        }}>
        <Pressable
          onPress={async () => {
            if (item.id === 1) return;
            const response = await toggleBoardPin(item.id);
            if (response.status === 401) {
              setTimeout(function () {
                Toast.show(
                  '토큰 정보가 만료되어 로그인 화면으로 이동합니다',
                  Toast.SHORT,
                );
              }, 100);
              logout();
              navigation.reset({routes: [{name: 'SplashHome'}]});
            } else if (getHundredsDigit(response.status) === 2) {
              onUpdate();
            } else {
              setTimeout(function () {
                Toast.show('알 수 없는 오류가 발생하였습니다.', Toast.SHORT);
              }, 100);
            }
          }}
          style={{
            height: 61,
            justifyContent: 'center',
            marginLeft: 10,
            width: 44,
          }}>
          {!item.isPinned ? (
            item.isOwner ? (
              <GrayFlag style={{marginLeft: 13}} />
            ) : (
              <GrayPin style={{marginLeft: 10}} />
            )
          ) : item.isOwner ? (
            <OrangeFlag style={{marginLeft: 13}} />
          ) : (
            <OrangePin style={{marginLeft: 10}} />
          )}
        </Pressable>
        <View style={{flex: 1, marginLeft: 5, marginRight: 15}}>
          <Text
            style={{
              fontSize: 14,
              color: '#000000',
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
              fontFamily: 'SpoqaHanSansNeo-Regular',
            }}>
            {item.introduction}
          </Text>
        </View>
      </TouchableOpacity>
    ))
  ) : (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: '#F6F6F6',
        paddingVertical: 10,
      }}>
      <Text
        style={{
          fontSize: 15,
          color: '#6E7882',
          fontFamily: 'SpoqaHanSansNeo-Regular',
        }}>
        생성된 교내 게시판이 없습니다
      </Text>
    </View>
  );
}

interface MenuProps {
  toMyPosting: () => void;
  toScrapedPosting: () => void;
  toMyCommentList: () => void;
}

export function MenuList({
  toMyPosting,
  toMyCommentList,
  toScrapedPosting,
}: MenuProps) {
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
        onPress={toMyCommentList}
        style={{
          flexDirection: 'row',
          height: 40,
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
        onPress={toScrapedPosting}
        style={{
          flexDirection: 'row',
          height: 40,
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
    backgroundColor: '#A055FF',
  },
  skeletonPin: {
    width: 14,
    height: 14,
    backgroundColor: '#A055FF',
    marginLeft: 22,
  },
  skeletonPinBoardName: {
    height: 14,
    backgroundColor: '#E1E4EA',
    marginLeft: 14,
  },
  skeletonBoardName: {
    height: 12,
    backgroundColor: '#E1E4EA',
    marginLeft: 14,
  },
  skeletonDescriptionName: {
    height: 10,
    backgroundColor: '#E1E4EA',
    marginLeft: 14,
    marginTop: 12,
  },
  skeletonRow: {
    flexDirection: 'row',
    paddingVertical: 11,
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
  },
  overlay: {
    zIndex: 98,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const pinnedSkeletonComponent = (
  <View>
    <View style={styles.pinnedSkeletonRow}>
      <View style={styles.skeletonPin}></View>
      <View style={[styles.skeletonPinBoardName, {width: 87}]}></View>
    </View>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        backgroundColor: '#A055FF',
      }}>
      <View style={styles.skeletonPin}></View>
      <View style={[styles.skeletonPinBoardName, {width: 124}]}></View>
    </View>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        backgroundColor: '#A055FF',
      }}>
      <View style={styles.skeletonPin}></View>
      <View style={[styles.skeletonPinBoardName, {width: 103}]}></View>
    </View>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        backgroundColor: '#A055FF',
      }}>
      <View style={styles.skeletonPin}></View>
      <View style={[styles.skeletonPinBoardName, {width: 87}]}></View>
    </View>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        backgroundColor: '#A055FF',
      }}>
      <View style={styles.skeletonPin}></View>
      <View style={[styles.skeletonPinBoardName, {width: 116}]}></View>
    </View>
  </View>
);

const boardSkeletonComponent = (
  <View>
    <View style={styles.skeletonRow}>
      <View style={styles.skeletonPin} />
      <View style={{flex: 1}}>
        <View style={[styles.skeletonBoardName, {width: 76}]}></View>
        <View style={[styles.skeletonDescriptionName, {width: 176}]}></View>
      </View>
    </View>
    <View style={styles.skeletonRow}>
      <View style={styles.skeletonPin} />
      <View style={{flex: 1}}>
        <View style={[styles.skeletonBoardName, {width: 44}]}></View>
        <View style={[styles.skeletonDescriptionName, {width: 206}]}></View>
      </View>
    </View>
    <View style={styles.skeletonRow}>
      <View style={styles.skeletonPin} />
      <View style={{flex: 1}}>
        <View style={[styles.skeletonBoardName, {width: 69}]}></View>
        <View style={[styles.skeletonDescriptionName, {width: 209}]}></View>
      </View>
    </View>
    <View style={styles.skeletonRow}>
      <View style={styles.skeletonPin} />
      <View style={{flex: 1}}>
        <View style={[styles.skeletonBoardName, {width: 56}]}></View>
        <View style={[styles.skeletonDescriptionName, {width: 168}]}></View>
      </View>
    </View>
    <View style={styles.skeletonRow}>
      <View style={styles.skeletonPin} />
      <View style={{flex: 1}}>
        <View style={[styles.skeletonBoardName, {width: 75}]}></View>
        <View style={[styles.skeletonDescriptionName, {width: 201}]}></View>
      </View>
    </View>
    <View style={styles.skeletonRow}>
      <View style={styles.skeletonPin} />
      <View style={{flex: 1}}>
        <View style={[styles.skeletonBoardName, {width: 83}]}></View>
        <View style={[styles.skeletonDescriptionName, {width: 165}]}></View>
      </View>
    </View>
  </View>
);
