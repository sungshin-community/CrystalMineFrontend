import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable,
  View,
  ScrollView,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {fontBold, fontMedium, fontRegular} from '../../../common/font';
import { getUsageRestrictions } from '../../../common/myPageApi'
import UsageRestrictionsDto from '../../../classes/mypage/UsageRestrictionsDto'
type RootStackParamList = {
  Announcement: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;

function UsageRestrictions({ navigation }: Props) {
   const [list, setList] = useState<UsageRestrictionsDto[]>();

  useEffect(() => {
    async function getList() {
      const list = await getUsageRestrictions(0);
      setList(list);
    }
    getList();
  }, []);
  return (
    <ScrollView>
      {list?.map((item) => ( 
      <><View style={styles.menuContainer}>
          <View style={[styles.menu]}>
            <Text style={[fontRegular, styles.boardName]}>{item.boardTitle}</Text>
            <View style={styles.menuIcon}>
              <Text style={[fontRegular, styles.blindDate]}>{item.blindedAt}</Text>
            </View>
          </View>
          <View style={[styles.menu, {marginTop: 5}]}>
            <Text style={[fontBold, styles.blindTitle]}>
              { item.type  === 1 ? '게시글 블라인드' : '댓글 블라인드'}</Text>
            <View style={styles.menuIcon}>
              <Text style={[fontRegular, styles.points]}>-{item.point} points</Text>
            </View>
          </View>
          <Text style={[fontRegular, styles.blindReason]}>
            블라인드 사유 : {item.reason}
          </Text>
        </View>
        <View
          style={{
            borderBottomColor: '#F0F0F0',
            borderBottomWidth: 1,
          }}
        /></>))}
       
       
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    paddingVertical: 24,
    backgroundColor: 'white',
    paddingHorizontal: 32,
  },
  menuIcon: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  menu: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  boardName: {
    fontSize: 13,
    color: '#222222',
  },
  blindDate: {
    color: '#6E7882',
    fontSize: 12,
  },
  blindTitle: {
    color: '#222222',
    fontSize: 15,
  },
  points: {
    color: '#A055FF',
    fontSize: 13,
  },
  blindReason: {
    color: '#6E7882',
    fontSize: 13,
    marginTop: 12,
  },
});

export default UsageRestrictions;
