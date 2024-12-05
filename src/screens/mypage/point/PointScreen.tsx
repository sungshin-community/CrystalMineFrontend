import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import PointBox from '../../../../resources/icon/PointBox';
import {getPointRecords} from '../../../common/pointApi';

// ChevronLeft 아이콘 컴포넌트
const ChevronLeft = () => (
  <View style={styles.chevron}>
    <View style={styles.chevronLine}></View>
  </View>
);

interface PointScreenProps {
  route: {
    params: {
      username: string;
      points: number;
    };
  };
  navigation: any;
}

interface PointRecord {
  value: string;
  detail: string;
  remaining: string;
  positive: boolean;
  createdAt: string;
}

const PointScreen: React.FC<PointScreenProps> = ({route, navigation}) => {
  const {points} = route.params;
  const [pointRecords, setPointRecords] = useState<PointRecord[]>([]);

  useEffect(() => {
    fetchPointRecords();
  }, []);

  const fetchPointRecords = async () => {
    try {
      const records = await getPointRecords();
      setPointRecords(records);
    } catch (error) {
      console.error('포인트 내역 조회 실패:', error);
    }
  };
  const renderPointRecord = ({item}: {item: PointRecord}) => (
    <View style={styles.recordItem}>
      <View style={styles.leftContent}>
        <Text style={styles.recordDetail}>{item.detail}</Text>
        <Text style={styles.dateText}>{item.createdAt}</Text>
      </View>
      <View style={styles.rightContent}>
        <Text
          style={[
            styles.recordValue,
            {color: item.positive ? '#00D36E' : '#FF5D5D'},
          ]}>
          {item.positive ? '+' : '-'} {item.value}
        </Text>
        <Text style={styles.remainingPoints}>남은 포인트 {item.remaining}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <ChevronLeft />
            </Pressable>
            <Text style={styles.title}>포인트 내역</Text>
          </View>
          <Pressable style={styles.submitButton}>
            <Text style={styles.submitButtonText}>충전하기</Text>
          </Pressable>
        </View>

        <View style={styles.pointSummary}>
          <View style={styles.pointSummaryContent}>
            <Text style={styles.pointLabel}>사용 가능 포인트</Text>
            <Text style={styles.totalPoints}>{points.toLocaleString()}</Text>
          </View>
        </View>

        <FlatList
          data={pointRecords}
          renderItem={renderPointRecord}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  chevron: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevronLine: {
    width: 10,
    height: 10,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    transform: [{rotate: '45deg'}],
    borderColor: '#000000',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 4,
  },
  submitButton: {
    backgroundColor: '#A055FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  pointSummary: {
    backgroundColor: '#F8F8FC',
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 12,
  },
  pointSummaryContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointLabel: {
    fontSize: 16,
    color: '#666666',
    height: 20,
  },
  totalPoints: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#A055FF',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  leftContent: {
    flex: 1,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  recordDetail: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
    fontWeight: '500',
  },
  dateText: {
    fontSize: 14,
    color: '#999999',
  },
  recordValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  remainingPoints: {
    fontSize: 14,
    color: '#999999',
  },
});

export default PointScreen;
