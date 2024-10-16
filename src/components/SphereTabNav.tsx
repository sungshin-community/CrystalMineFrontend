import React from 'react';
import JewelPurple from '../../resources/icon/JewelPurple';
import PeoplePurple from '../../resources/icon/PeoplePurple';
import CrystalBall from '../../resources/icon/CrystalBall';
import Note from '../../resources/icon/Note';
import MessagePurple from '../../resources/icon/MessagePurple';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface SphereTabNavProps {
  onTabPress: (index: number) => void;
  activeTabIndex: number;
}

const tabs = [
  {
    name: '전체',
    icon: JewelPurple,
  },
  {
    name: '자유',
    icon: PeoplePurple,
  },
  {
    name: '궁금해요',
    icon: CrystalBall,
  },
  {
    name: '수정후기',
    icon: Note,
  },
  {
    name: '채팅방',
    icon: MessagePurple,
  },
];

export default function SphereTabNav({
  onTabPress,
  activeTabIndex,
}: SphereTabNavProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const isActive = activeTabIndex === index;
        return (
          <TouchableOpacity
            key={index}
            style={styles.tabButton}
            onPress={() => onTabPress(index)}>
            <View
              style={[
                styles.iconWrapper,
                isActive && styles.activeIconWrapper,
              ]}>
              <tab.icon />
            </View>
            <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff', // 배경 색깔 수정
    paddingVertical: 16,
    paddingHorizontal: 26,
    borderBottomWidth: 4,
    borderBottomColor: '#EFEFF3',
  },
  tabButton: {
    alignItems: 'center',
  },
  tabLabel: {
    color: '#BCC2C9',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 8,
  },
  activeTabLabel: {
    color: '#A055FF',
    fontWeight: '700',
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconWrapper: {
    borderWidth: 2,
    borderColor: '#A055FF',
  },
});
