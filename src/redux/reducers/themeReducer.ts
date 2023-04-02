import { ThemeState, ThemeAction, ThemeActionsTypes } from './../../types/Theme/themeReducer';

const initialState: ThemeState = {
  theme: 'dark'
}

export const themeReducer = (state = initialState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case ThemeActionsTypes.SET_THEME: {
      return {
        ...state,
        theme: state.theme === 'dark' ? 'white' : 'dark'
      }
    }
    default: return state
  }
}
