import React from 'react'
import { useTranslation } from 'react-i18next'
import { appLangType } from '../types/Auth/auth'

interface CheckBoxProps {
  title: appLangType,
  text: string,
  cheked: boolean,
  onCheckBoxChange: (title: appLangType) => void
}

const CheckBox = ({ cheked, text, title, onCheckBoxChange }: CheckBoxProps) => {
  const { t } = useTranslation()

  return (
    <div className='flex items-center gap-x-4' onClick={() => onCheckBoxChange(title)}>
      <div className={`${cheked ? 'bg-yellow-500' : ' border-white'} p-2 border-2`} />
      <div>{t(text)}</div>
    </div>
  )
}

export default CheckBox