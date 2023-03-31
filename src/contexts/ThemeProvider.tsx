import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

export type ThemeInterface = {
  isDarkMode: boolean;
  toggleDarkMode: Dispatch<SetStateAction<boolean>>;
};

const defaultValue = {
  isDarkMode: false,
  toggleDarkMode: () => {},
};

export const ThemeContext = createContext<ThemeInterface>(defaultValue);

export const GetAppThemeContext = () => {
  const themeContext = useContext(ThemeContext);
  return themeContext;
};
