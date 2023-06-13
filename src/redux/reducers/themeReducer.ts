import { getUserSystemLanguage, getUserSystemTheme } from '../../utils/getUserSystemSettings';
import { ThemeState, ThemeAction, ThemeActionsTypes } from './../../types/Theme/themeReducer';

const initialState: ThemeState = {
  theme: getUserSystemTheme(),
  lang: getUserSystemLanguage()
}

export const themeReducer = (state = initialState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case ThemeActionsTypes.SET_THEME: {
      return {
        ...state,
        theme: state.theme === 'dark' ? 'white' : 'dark'
      }
    }
    case ThemeActionsTypes.SET_LANG: {
      return {
        ...state,
        lang: action.payload
      }
    }
    default: return state
  }
}
