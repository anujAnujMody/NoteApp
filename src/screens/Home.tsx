import React from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import NoteItem from '../components/NoteItem';
import notesDB from '../data/NotesDB';
import {RouteStackParams} from '../navigation/MainRoute';
import {typography} from '../styles';
import {appTypes} from '../types';
import BaseView from '../components/BaseView';

function Home(): JSX.Element {
  const navigation =
    useNavigation<NativeStackNavigationProp<RouteStackParams>>();

  const [list, setList] = useState(Array<appTypes.Notes>);

  const focus = useIsFocused();

  const {
    header,
    fabContainer,
    fabText,
    mainParent,
    emptyDataContainer,
    emptyText,
  } = styles;

  useEffect(() => {
    if (focus) {
      let dummyList: Array<appTypes.Notes> = [];
      //to get all the notes
      notesDB
        .getAllData()
        .then(value => {
          value.map(item => {
            dummyList.push(item);
            setList(dummyList.reverse());
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [focus]);

  return (
    <BaseView>
      <Text style={[typography.textHeader, header]}>Notes</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Detail');
        }}
        style={fabContainer}>
        <Text style={fabText}>+</Text>
      </TouchableOpacity>
      <View style={mainParent}>
        {list.length === 0 ? (
          <View style={emptyDataContainer}>
            <Text style={[typography.textHeader, emptyText]}>No Notes</Text>
          </View>
        ) : (
          <FlatList
            data={list}
            renderItem={item => <NoteItem {...item.item}> </NoteItem>}
            numColumns={1}
            keyExtractor={(item, _) => `${item.id}`}
          />
        )}
      </View>
    </BaseView>
  );
}

export default Home;

const styles = StyleSheet.create({
  header: {
    padding: 10,
    color: 'white',
  },
  fabContainer: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1,
    justifyContent: 'center',
  },
  fabText: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 40,
    fontWeight: '600',
  },
  mainParent: {flex: 1, marginLeft: 10},
  emptyDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: 'white',
  },
});
