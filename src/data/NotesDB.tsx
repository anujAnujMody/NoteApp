import AsyncStorage from '@react-native-async-storage/async-storage';
import {appTypes} from '../types';

const storeNote = async (value: appTypes.Notes) => {
  try {
    await AsyncStorage.setItem(`${value.id}`, JSON.stringify(value));
  } catch (e) {
    // saving error
    throw Error(e);
  }
  console.log('Done.');
};

const getNote = async (id: string) => {
  try {
    const json = await AsyncStorage.getItem(id);
    return json != null ? JSON.parse(json) : null;
  } catch (e) {
    // saving error
    throw Error(e);
  }
};

const getAllData = async (): Promise<appTypes.Notes[]> => {
  return AsyncStorage.getAllKeys()
    .then(keys => {
      return AsyncStorage.multiGet(keys);
    })
    .then(result => {
      return result.map(value => {
        return JSON.parse(value?.[1] ? value?.[1] : '') as appTypes.Notes;
      });
    });
};

export default {
  storeNote,
  getNote,
  getAllData,
};
