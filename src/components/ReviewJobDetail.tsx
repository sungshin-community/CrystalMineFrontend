import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';

const ReviewJobDetail = ({job, category, size, year}) => {
  return (
    <View style={styles.detailBox}>
      <View style={[styles.row, styles.borderBottom]}>
        <View style={[styles.cell, styles.borderRight]}>
          <Text style={styles.label}>직무 정보</Text>
          <Text style={styles.value}>{job}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.label}>카테고리</Text>
          <Text style={styles.value}>{category}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={[styles.cell, styles.borderRight]}>
          <Text style={styles.label}>규모</Text>
          <Text style={styles.value}>{size}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.label}>경력</Text>
          <Text style={styles.value}>{year}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailBox: {
    backgroundColor: '#F5F5F9',
    marginBottom: 20,
    borderRadius: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cell: {
    padding: 12,
    flexDirection: 'row',
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6E7882',
  },
  value: {
    marginLeft: 'auto',
    fontSize: 14,
    color: '#89919A',
  },
  borderRight: {
    borderRightWidth: 1,
    borderColor: '#E0E0E0',
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
});

export default ReviewJobDetail;
