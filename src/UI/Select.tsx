import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ILangs } from '../types/Theme/theme'
import { langType } from '../types/User/user'
import CheckBox from './CheckBox'

interface SelectProps {
  lang: langType,
  onAccept: (value: langType) => void
}

const Select = ({ lang, onAccept }: SelectProps) => {
  const { t } = useTranslation()
  const langsArr: ILangs[] = [{ text: 'English', lang: 'en', checked: lang === 'en' }, { text: 'Українська', lang: 'ua', checked: lang === 'ua' }]
  const [langs, setlangs] = useState(langsArr)

  const onCheckBoxChange = (lang: langType) => {
    setlangs([...langs].map(l => l.lang === lang ? { ...l, checked: true } : { ...l, checked: false }))
  }

  return (
    <div>
      <div>{t('appLang')}</div>
      {langs.map(l => (
        <CheckBox key={l.text} cheked={l.checked} text={l.text} onCheckBoxChange={onCheckBoxChange} title={l.lang} />
      ))}
      <div onClick={() => onAccept(langs.find(l => l.checked)?.lang || 'en')}>Accept</div>
    </div>
  )
}

export default Select