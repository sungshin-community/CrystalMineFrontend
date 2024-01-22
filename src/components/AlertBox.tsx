import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';

interface AlertBoxProps {
  icon: React.ReactNode;
  title: string;
  message?: string;
  date?: string;
}

const AlertBox: React.FC<AlertBoxProps> = ({ icon, title, message, date }) => {
  return (
    <View style={styles.alertBox}>
    <View style={styles.icon}>
        {icon}
    </View>
      <View>
      <Text style={styles.titleText}>{title}</Text>
      {message && <Text style={styles.contentText}>{message}</Text>}
      {date && <Text style={styles.dateText}>{date}</Text>}
      </View>
    </View>
  );
};

export default AlertBox;

const styles = StyleSheet.create({
  titleText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  contentText: {
    fontSize: 12,
    color: '#878787',
    marginTop: 4,
  },
  dateText: {
     fontSize: 11,
     color: '#878787',
     marginTop: 4,
    },
  icon: {
    marginRight: 20,
  },
  alertBox: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 13,
    width: 350,
  },
});
