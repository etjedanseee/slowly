import React from 'react'
import { useTranslation } from 'react-i18next'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { appLangType } from '../types/Auth/auth'
import LangSelect from '../UI/LangSelect'

const Settings = () => {
  // const { t } = useTranslation()
  const { lang, theme } = useTypedSelector(state => state.theme)
  const { changeLanguage } = useActions()


  const onAccept = (selectedLang: appLangType) => {
    changeLanguage(selectedLang)
  }

  return (
    <div>
      <div>Settings</div>
      <div className='my-5'>
        <LangSelect lang={lang} onAccept={onAccept} />
      </div>
    </div>
  )
}

export default Settings