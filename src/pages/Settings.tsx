import React from 'react'
import { useTranslation } from 'react-i18next'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { langType } from '../types/Theme/theme'
import Select from '../UI/Select'

const Settings = () => {
  // const { t } = useTranslation()
  const { lang, theme } = useTypedSelector(state => state.theme)
  const { changeLanguage } = useActions()


  const onAccept = (selectedLang: langType) => {
    changeLanguage(selectedLang)
  }

  return (
    <div>
      <div>Settings</div>
      <div className='my-5'>
        <Select lang={lang} onAccept={onAccept} />
      </div>
    </div>
  )
}

export default Settings