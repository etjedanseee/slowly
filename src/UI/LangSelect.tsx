import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ILangs } from '../types/Theme/theme'
import { appLangType } from '../types/Theme/theme'
import LangCheckBox from './LangCheckBox'

interface LangSelectProps {
  lang: appLangType,
  onAccept: (value: appLangType) => void
}

const LangSelect = ({ lang, onAccept }: LangSelectProps) => {
  const { t } = useTranslation()
  const langsArr: ILangs[] = [{ text: 'English', lang: 'en', checked: lang === 'en' }, { text: 'Українська', lang: 'ua', checked: lang === 'ua' }]
  const [langs, setlangs] = useState(langsArr)

  const onLangCheckBoxChange = (lang: appLangType) => {
    setlangs([...langs].map(l => l.lang === lang ? { ...l, checked: true } : { ...l, checked: false }))
  }

  return (
    <div>
      <div>{t('appLang')}</div>
      {langs.map(l => (
        <LangCheckBox key={l.text} cheked={l.checked} text={l.text} onLangCheckBoxChange={onLangCheckBoxChange} title={l.lang} />
      ))}
      <div onClick={() => onAccept(langs.find(l => l.checked)?.lang || 'en')}>Accept</div>
    </div>
  )
}

export default LangSelect