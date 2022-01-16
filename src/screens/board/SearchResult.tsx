import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PostSearchResult from './PostSearchResult';
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import BoardSearchResult from './BoardSearchResult';
import TagSearchResult from './TagSearchResult';
import SearchIcon from '../../../resources/icon/SearchIcon';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  BoardSearch: undefined;
};
type Props = NativeStackScreenProps<RootStackParamList>;
const Tab = createMaterialTopTabNavigator();

function SearchResult({navigation}: Props) {
  return (
    <Tab.Navigator
      initialRouteName="BoardSearch"
      screenOptions={{
        tabBarStyle: {
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 5},
          shadowRadius: 20,
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#A055FF',
          height: 8,
          width: 24,
          borderRadius: 10,
          marginHorizontal: 60,
        },
        tabBarShowLabel: false,
        tabBarIcon: ({focused, color}) => (
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="전체 게시판에서 검색"
              placeholderTextColor="#898989"
              onFocus={() => navigation.navigate('BoardSearch')}
            />
            <Pressable style={styles.icon}>
              <SearchIcon />
            </Pressable>
          </View>
        ),
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#717171',
      }}>
      <Tab.Screen
        name="PostSearchResult"
        component={PostSearchResult}
        options={{tabBarIcon: () => <Text>게시글</Text>}}
      />
      <Tab.Screen
        name="BoardSearchResult"
        component={BoardSearchResult}
        options={{tabBarIcon: () => <Text>게시판</Text>}}
      />
      <Tab.Screen
        name="TagSearchResult"
        component={TagSearchResult}
        options={{tabBarIcon: () => <Text>태그</Text>}}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginHorizontal: 16,
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'rgb(239, 239, 239)',
    width: Dimensions.get('window').width - 32,
    height: 44,
    borderRadius: 20,
    paddingLeft: 48,
    fontFamily: 'SpoqaHanSansNeo-Regular',
    fontSize: 15,
    marginTop: 19,
  },
  icon: {
    position: 'absolute',
    top: 30,
    left: 19,
  },
});

export default SearchResult;
