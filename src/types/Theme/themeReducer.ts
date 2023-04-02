import { themeType } from './theme';

export interface ThemeState {
  theme: themeType
}

export enum ThemeActionsTypes {
  SET_THEME = 'SET_THEME'
}

interface setTheme {
  type: ThemeActionsTypes.SET_THEME,
}


export type ThemeAction = setTheme