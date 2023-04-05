import { appLangType } from './../../types/User/user';
import { ThemeActionsTypes } from './../../types/Theme/themeReducer';
import { Dispatch } from 'redux';
import { ThemeAction } from '../../types/Theme/themeReducer';

export const switchTheme = () => {
  return (dispatch: Dispatch<ThemeAction>) => {
    dispatch({ type: ThemeActionsTypes.SET_THEME })
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