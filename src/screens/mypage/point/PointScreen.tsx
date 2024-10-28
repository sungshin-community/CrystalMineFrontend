import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PointBox from '../../../../resources/icon/PointBox';

interface PointScreenProps {
  route: {
    params: {
      username: string;
      points: number;
    };
  };
}

const PointScreen: React.FC<PointScreenProps> = ({route}) => {
  const {username, points} = route.params;

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>포인트 내용</Text> */}
      {/* <Text style={styles.username}>{username}님의 포인트</Text> */}
      <View style={styles.pointBoxContainer}>
        <PointBox />
        <Text style={styles.points}>{points}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  username: {
    fontSize: 18,
    marginBottom: 10,
  },
  pointBoxContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  points: {
    position: 'absolute',
    marginLeft: 8,
    fontSize: 20,
    color: '#A055FF',
    fontFamily: 'SpoqaHanSansNeo-Bold',
    right: 25,
  },
});

export default PointScreen;
