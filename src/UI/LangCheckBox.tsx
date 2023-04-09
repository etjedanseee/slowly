import React from 'react'
import { useTranslation } from 'react-i18next'
import { appLangType } from '../types/Theme/theme'

interface LangCheckBoxProps {
  title: appLangType,
  text: string,
  cheked: boolean,
  onLangCheckBoxChange: (title: appLangType) => void
}

const LangCheckBox = ({ cheked, text, title, onLangCheckBoxChange }: LangCheckBoxProps) => {
  const { t } = useTranslation()

  return (
    <div className='flex items-center gap-x-4' onClick={() => onLangCheckBoxChange(title)}>
      <div className={`${cheked ? 'bg-yellow-500' : ' border-white'} p-2 border-2`} />
      <div>{t(text)}</div>
    </div>
  )
}

export default LangCheckBox