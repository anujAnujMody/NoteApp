import React, {useState} from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ThemeContext} from '../contexts/ThemeProvider';
import {appTypes} from '../types';
import Home from '../screens/Home';
import Detail from '../screens/Detail';

export type RouteStackParams = {
  Home: undefined;
  Detail?: appTypes.Notes;
};

const Stack = createNativeStackNavigator<RouteStackParams>();

const AppLightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.lighter,
  },
};

const AppDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: Colors.darker,
    text: 'white',
  },
};

function AppScreens(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
}

function MainRoute(): JSX.Element {
  const [isDarkMode, toggleDarkMode] = useState(false);

  const providerValue = {
    isDarkMode,
    toggleDarkMode,
  };

  return (
    <ThemeContext.Provider value={providerValue}>
      <NavigationContainer theme={isDarkMode ? AppDarkTheme : AppLightTheme}>
        <AppScreens />
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

export default MainRoute;
