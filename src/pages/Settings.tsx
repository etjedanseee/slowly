import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { ReactComponent as ArrowBackIcon } from '../assets/arrowBack.svg'
import { ReactComponent as ArrowDownIcon } from '../assets/arrowDown.svg'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as MoonIcon } from '../assets/moon.svg'
import { ReactComponent as SunIcon } from '../assets/sun.svg'
import { ReactComponent as SignOutIcon } from '../assets/signout.svg'
import Select from '../UI/Select'
import { appLangsArr } from '../utils/consts'
import { appLangType } from '../types/Theme/theme'

const Settings = () => {
  const { t } = useTranslation()
  const { theme, lang } = useTypedSelector(state => state.theme)
  const { user } = useTypedSelector(state => state.auth)
  const { switchTheme, changeLanguage, updateUserSettings } = useActions()
  const navigate = useNavigate()

  const [isAppLanguageSelectVisible, setIsAppLanguageSelectVisible] = useState(false)
  const [appLanguage, setAppLanguage] = useState(lang)
  const [isConfirmBeforeSendLetter, setIsConfirmBeforeSendLetter] = useState(user?.settings.isConfirmBeforeSendLetter ?? true)

  const handleAppLanguageSelectVisible = () => {
    setIsAppLanguageSelectVisible(prev => !prev)
  }

  const onChangeAppLang = (language: appLangType) => {
    setAppLanguage(language)
  }

  const onSaveAppLanguage = () => {
    changeLanguage(appLanguage)
    if (user) {
      updateUserSettings(user, {
        appLang: appLanguage,
        isConfirmBeforeSendLetter: user.settings.isConfirmBeforeSendLetter,
        theme,
      })
    }
    handleAppLanguageSelectVisible()
  }

  const onCloseAppLanguageSelect = () => {
    setAppLanguage(lang)
    handleAppLanguageSelectVisible()
  }

  const onGoBackClick = () => {
    navigate(-1)
  }

  const onSignOutClick = () => {
    localStorage.clear()
    navigate('/auth', { replace: true })
    window.location.reload()
  }

  const onSwitchTheme = () => {
    switchTheme()
    if (user) {
      updateUserSettings(user, {
        appLang: lang,
        isConfirmBeforeSendLetter: user.settings.isConfirmBeforeSendLetter,
        theme: theme === 'dark' ? 'white' : 'dark'
      })
    }
  }

  const onSwitchIsConfirmBeforeSendLetter = () => {
    setIsConfirmBeforeSendLetter(prev => !prev)
    if (user) {
      updateUserSettings(user, {
        appLang: lang,
        isConfirmBeforeSendLetter: !isConfirmBeforeSendLetter,
        theme,
      })
    }
  }

  return (
    <div className={`h-screen pt-20 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'}`}>
      <div className={`fixed top-0 left-0 nMb:left-1/2 nMb:-translate-x-1/2 nMb:max-w-[425px] 
        w-full py-3 px-3 flex items-center gap-x-6 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-200'}
      `}>
        <ArrowBackIcon
          className={`h-7 w-7 cursor-pointer ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
          onClick={onGoBackClick}
        />
        <div className='text-xl'>{t('settings')}</div>
      </div>

      <div className={`flex px-2 items-center justify-between py-3 mb-6 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-200'}`}>
        <div className='text-lg'>{t('appLang')}</div>

        <div
          className='flex items-center gap-x-1 cursor-pointer'
          onClick={handleAppLanguageSelectVisible}
        >
          <div className='text-lg font-medium'>{lang}</div>
          <ArrowDownIcon className={`h-6 w-6 duration-500 transition-transform 
            ${isAppLanguageSelectVisible ? '-rotate-90' : 'rotate-0'} ${theme === 'dark' ? 'fill-white' : 'fill-black'}  `}
          />
        </div>

        {isAppLanguageSelectVisible && (
          <Select
            options={appLangsArr}
            selectedOption={appLanguage}
            title='appLang'
            onClose={onCloseAppLanguageSelect}
            onSave={onSaveAppLanguage}
            onSelectOption={onChangeAppLang}
          />
        )}
      </div>

      <div className={`flex px-2 items-center justify-between py-3 mb-6 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-200'}`}>
        <div className='text-lg'>{t('switchTheme')}</div>
        {theme === 'white'
          ? <SunIcon className='h-10 w-10 fill-black cursor-pointer' onClick={onSwitchTheme} />
          : <MoonIcon className='h-9 w-9 fill-white cursor-pointer' onClick={onSwitchTheme} />}
      </div>

      <div className={`flex px-2 gap-x-1 items-center justify-between py-3 mb-6 
        ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-200'}
      `}>
        <div className='text-lg'>{t('confirmBeforeSendLetter')}</div>
        <div className={`border-yellow-400 border-2 h-5 w-5 flex items-center justify-center cursor-pointer`}>
          <div
            className={`${isConfirmBeforeSendLetter ? 'bg-yellow-400' : 'bg-transparent'} h-3 w-3`}
            onClick={onSwitchIsConfirmBeforeSendLetter}
          />
        </div>
      </div>

      <div className={`flex items-center justify-between px-2 py-3 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-200'}`}>
        <div className='text-lg'>{t('signOut')}</div>
        <SignOutIcon
          className={`h-7 w-7 fill-red-500 cursor-pointer`}
          onClick={onSignOutClick}
        />
      </div>

    </div>
  )
}

export default Settings