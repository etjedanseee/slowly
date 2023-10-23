import React from 'react'
import { useTranslation } from 'react-i18next'
import { appLangType } from '../types/Theme/theme'
import { useTypedSelector } from '../hooks/useTypedSelector'

interface LangCheckBoxProps {
  title: appLangType,
  name: string,
  cheked: boolean,
  onLangCheckBoxChange: (title: appLangType) => void
}

const LangCheckBox = ({ cheked, name, title, onLangCheckBoxChange }: LangCheckBoxProps) => {
  const { t } = useTranslation()
  const { theme } = useTypedSelector(state => state.theme)

  const notChekedStyles = theme === 'dark' ? 'border-white' : 'border-gray-500'

  return (
    <div className='flex items-center gap-x-4' onClick={() => onLangCheckBoxChange(title)}>
      <div className={`
        ${cheked
          ? 'bg-yellow-400 border-yellow-400'
          : notChekedStyles
        } 
          p-2 border-2`
      }
      />
      <div>{t(name)}</div>
    </div>
  )
}

export default LangCheckBox