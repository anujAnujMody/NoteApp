import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import notesDB from '../data/NotesDB';
import {RouteStackParams} from '../navigation/MainRoute';
import {typography} from '../styles';
import InputScrollView from 'react-native-input-scroll-view';

type Props = NativeStackScreenProps<RouteStackParams, 'Detail'>;

const Detail = ({route, navigation}: Props) => {
  const params = route.params;
  const {container, titleInput, descInput} = styles;

  let title: string;
  let desc: string;

  function setTitleValue(text: string) {
    title = text;
  }

  function setDescValue(text: string) {
    desc = text;
  }

  useEffect(() => {
    navigation.setOptions({title: params?.title ? params.title : ''});
    return () => {
      if (title && desc) {
        notesDB
          .storeNote({
            id: params?.id ? params.id : Math.random(),
            title: title,
            desc: desc,
            createdAt: 'today',
          })
          .catch(error => {
            console.log(error);
          });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={container}>
      <TextInput
        defaultValue={params?.title}
        placeholder={'Title'}
        multiline={true}
        onChangeText={setTitleValue}
        style={[typography.textTitle, titleInput]}
      />
      <InputScrollView>
        <TextInput
          defaultValue={params?.desc}
          multiline={true}
          placeholder={'Lorem Ipsum'}
          onChangeText={setDescValue}
          style={[typography.textRegular, descInput]}
        />
      </InputScrollView>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {margin: 10},
  titleInput: {
    width: '100%',
    marginBottom: 20,
  },
  descInput: {width: '100%', height: '100%'},
});
