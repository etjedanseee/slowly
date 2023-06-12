import React from 'react'
import { useTranslation } from 'react-i18next'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import LangSelect from '../UI/LangSelect'
import { ReactComponent as ArrowBackIcon } from '../assets/arrowBack.svg'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as MoonIcon } from '../assets/moon.svg'
import { ReactComponent as SunIcon } from '../assets/sun.svg'
import { ReactComponent as SignOutIcon } from '../assets/signout.svg'

const Settings = () => {
  const { t } = useTranslation()
  const { theme } = useTypedSelector(state => state.theme)
  const { switchTheme } = useActions()
  const navigate = useNavigate()

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
  }

  return (
    <div className={`min-h-screen pt-20 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'}`}>
      <div className={`fixed top-0 left-0 w-full py-3 px-3 flex items-center gap-x-6 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-200'}`}>
        <ArrowBackIcon
          className={`h-7 w-7 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
          onClick={onGoBackClick}
        />
        <div className='text-xl'>{t('settings')}</div>
      </div>

      <LangSelect />

      <div className={`flex px-2 items-center justify-between py-3 mb-6 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-200'}`}>
        <div className='text-lg'>{t('switchTheme')}</div>
        {theme === 'white'
          ? <SunIcon className='h-10 w-10 fill-black' onClick={onSwitchTheme} />
          : <MoonIcon className='h-9 w-9 fill-white' onClick={onSwitchTheme} />}
      </div>


      <div className={`flex items-center justify-between px-2 py-3 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-200'}`}>
        <div className='text-lg'>{t('signOut')}</div>
        <SignOutIcon
          className={`h-7 w-7 fill-red-500`}
          onClick={onSignOutClick}
        />
      </div>

    </div>
  )
}

export default Settings