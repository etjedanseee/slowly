import { appLangType } from '../Theme/theme';
import { themeType } from './theme';

export interface ThemeState {
  theme: themeType,
  lang: appLangType
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
  payload: appLangType
}


export type ThemeAction = setTheme | setLang