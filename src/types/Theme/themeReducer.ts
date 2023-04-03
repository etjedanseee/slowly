import { themeType, langType } from './theme';

export interface ThemeState {
  theme: themeType,
  lang: langType
}

export enum ThemeActionsTypes {
  SET_THEME = 'SET_THEME',
  SET_LANG = 'SET_LANG'
}

interface setTheme {
  type: ThemeActionsTypes.SET_THEME,
}

interface setLang {
  type: ThemeActionsTypes.SET_LANG,
  payload: langType
}


export type ThemeAction = setTheme | setLang