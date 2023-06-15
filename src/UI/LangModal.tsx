import React, { useState } from 'react'
import { ReactComponent as CloseIcon } from '../assets/close.svg'
import { useTranslation } from 'react-i18next'
import MyButton from './MyButton'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { ILang } from '../types/Auth/auth'
import { levelLangNames } from '../utils/consts'

interface LangModalProps {
  lang: ILang | null,
  handleModalLangVisible: () => void,
  onAddLang: (lang: ILang) => void
}

const LangModal = ({ lang, handleModalLangVisible, onAddLang }: LangModalProps) => {
  const [langLevel, setLangLevel] = useState(lang?.level || 0)
  const { theme } = useTypedSelector(state => state.theme)

  const { t } = useTranslation()

  if (!lang) {
    return null
  }

  const handleChangleLevel = (level: number) => {
    setLangLevel(level)
  }

  return (
    <div className={`fixed top-0 left-0 h-screen z-50 w-full py-3
      ${theme === 'dark' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'}`}
    >
      <div className='flex justify-between mb-8 px-2'>
        <CloseIcon
          className={`${theme === 'dark' ? 'fill-white' : 'fill-black'} h-7 w-7`}
          onClick={handleModalLangVisible}
        />
        <div className='flex-initial'>
          <MyButton color='yellow' title='add' onClick={() => onAddLang({ ...lang, level: langLevel })} />
        </div>
      </div>

      <div className='flex flex-col items-center mb-5'>
        <div
          className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-3xl font-medium tracking-wide`}
        >
          {lang.name}
        </div>
        <div className={`${theme === 'dark' ? 'text-gray-300' : 'text-zinc-800'} mb-4`}>{lang.engName}</div>

        <div className='flex justify-center gap-x-1'>
          {[1, 2, 3, 4, 5].map(ind => (
            <div
              key={ind}
              className={`
              ${langLevel >= ind
                  ? 'border-yellow-400 bg-yellow-400'
                  : theme === 'dark' ? 'border-white bg-transparent' : 'border-gray-400'
                } 
                rounded-full border-2 h-3 w-3
              `}
            ></div>
          ))}
        </div>
      </div>

      <div className={`${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'}`}>
        <div className={`${theme === 'dark' ? 'bg-zinc-900 text-gray-300' : 'bg-white text-black font-medium'} py-2 px-2 text-xs`}>
          {t('Language Proficiency')}
        </div>

        <div className='px-3 flex flex-col gap-y-2 py-2'>
          {levelLangNames.map((name, index) => (
            <div
              key={name}
              className='flex gap-x-4 items-center'
              onClick={() => handleChangleLevel(index)}
            >
              <div
                className={`
              ${langLevel === index
                    ? 'border-yellow-400 bg-yellow-400'
                    : theme === 'dark' ? 'border-white bg-transparent' : 'border-gray-400'
                  } 
                rounded-full border-2 h-4 w-4
              `}
              ></div>
              <div className={`${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>{t(name)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LangModal