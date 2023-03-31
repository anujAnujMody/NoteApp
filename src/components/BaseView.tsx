import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';

type Props = {
  children: React.ReactNode;
};
const BaseView = ({children}: Props) => {
  const {parent} = styles;
  return (
    <SafeAreaView>
      <View style={parent}>{children}</View>
    </SafeAreaView>
  );
};

export default BaseView;

const styles = StyleSheet.create({
  parent: {
    height: '100%',
    width: '100%',
    backgroundColor: '#0D0F15',
  },
});
