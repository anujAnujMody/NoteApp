import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RouteStackParams} from '../navigation/MainRoute';
import {appTypes} from '../types';
import {typography} from '../styles';

const NoteItem = (item: appTypes.Notes) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RouteStackParams>>();

  const {
    container,
    titleDescContainer,
    title,
    desc,
    bottomContainer,
    createdAt,
  } = styles;

  return (
    <TouchableOpacity
      key={item.id}
      onPress={() => {
        navigation.navigate('Detail', item);
      }}
      style={container}>
      <View style={titleDescContainer}>
        <Text style={[title, typography.textTitle]}>{item.title}</Text>
        <Text style={desc} numberOfLines={3} ellipsizeMode="tail">
          {item.desc}
        </Text>
      </View>
      <View style={bottomContainer}>
        <Text style={[createdAt, typography.textSmall]}>{item.createdAt}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NoteItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 3,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#12151C',
    justifyContent: 'space-between',
    padding: 10,
    flexWrap: 'nowrap',
    marginRight: 10,
    marginBottom: 10,
  },
  titleDescContainer: {flex: 2, marginBottom: 5},
  title: {color: 'white'},
  desc: {color: 'white', marginTop: 5, fontSize: 14},
  bottomContainer: {
    width: '100%',
    padding: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  createdAt: {
    alignSelf: 'flex-end',
    color: 'white',
    fontWeight: '200',
  },
});
