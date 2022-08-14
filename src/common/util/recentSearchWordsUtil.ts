import AsyncStorage from '@react-native-async-storage/async-storage';

export async function loadRecentSearchWord(key: string) {
  const jsonRecentSearchWords = await AsyncStorage.getItem(key);
  if (jsonRecentSearchWords) {
    const recentSearchWordList = JSON.parse(jsonRecentSearchWords);
    return recentSearchWordList;
  } else {
    return [];
  }
}

export async function saveRecentSearchWord(searchWord: string, key: string) {
  const jsonRecentSearchWords = await AsyncStorage.getItem(key);
  let recentSearchWordList: string[] = [];
  if (jsonRecentSearchWords) {
    recentSearchWordList = JSON.parse(jsonRecentSearchWords);
  }
  const index = recentSearchWordList.findIndex(value => value === searchWord);
  if (index >= 0) {
    // 있으면 삭제
    recentSearchWordList.splice(index, 1);
  }
  recentSearchWordList.unshift(searchWord);
  if (recentSearchWordList.length > 5) {
    // 5개 넘으면 삭제
    recentSearchWordList.pop();
  }
  await AsyncStorage.setItem(key, JSON.stringify(recentSearchWordList));
  return recentSearchWordList;
}

export async function deleteRecentSearchWord(searchWord: string, key: string) {
  const jsonRecentSearchWords = await AsyncStorage.getItem(key);
  let recentSearchWordList: string[] = [];
  if (jsonRecentSearchWords) {
    recentSearchWordList = JSON.parse(jsonRecentSearchWords);
  }
  const index = recentSearchWordList.findIndex(word => word === searchWord);
    if (index >= 0) {
      recentSearchWordList.splice(index, 1);
  }
  await AsyncStorage.setItem(key, JSON.stringify(recentSearchWordList));
  return recentSearchWordList;
}

export async function deleteAllRecentSearchWords(key: string) {
  await AsyncStorage.setItem(key, '');
}