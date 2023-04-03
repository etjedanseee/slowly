import { ThemeActionsTypes } from './../../types/Theme/themeReducer';
import { Dispatch } from 'redux';
import { ThemeAction } from '../../types/Theme/themeReducer';
import { langType } from '../../types/Theme/theme';

export const switchTheme = () => {
  return (dispatch: Dispatch<ThemeAction>) => {
    dispatch({ type: ThemeActionsTypes.SET_THEME })
  }
}

export const changeLanguage = (lang: langType) => {
  return (dispatch: Dispatch<ThemeAction>) => {
    dispatch({
      type: ThemeActionsTypes.SET_LANG,
      payload: lang
    })
  }
}