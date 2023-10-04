import { ThemeActionsTypes } from './../../types/Theme/themeReducer';
import { Dispatch } from 'redux';
import { ThemeAction } from '../../types/Theme/themeReducer';
import { appLangType, themeType } from '../../types/Theme/theme';

export const changeTheme = (newTheme: themeType) => {
  return (dispatch: Dispatch<ThemeAction>) => {
    dispatch({ type: ThemeActionsTypes.SET_THEME, payload: newTheme })
  }
}

export const changeLanguage = (lang: appLangType) => {
  return (dispatch: Dispatch<ThemeAction>) => {
    dispatch({
      type: ThemeActionsTypes.SET_LANG,
      payload: lang
    })
  }
}