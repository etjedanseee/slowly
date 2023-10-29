import { appLangType, themeType } from "../types/Theme/theme";

export const getUserSystemTheme = (): themeType => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    } else {
      return 'white'
    }
  } else {
    return 'dark'
  }
}

export const getUserSystemLanguage = (): appLangType => {
  const userLanguage = navigator.language.split('-')[0];
  if (userLanguage === 'en' || userLanguage === 'ua') {
    return userLanguage
  } else {
    return 'ua'
  }
}
