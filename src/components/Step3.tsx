import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { ILangList } from '../types/User/user'
import LangModal from '../UI/LangModal'
import { writingLang } from '../utils/consts'

//
const Step3 = () => {
  const { t } = useTranslation()
  const { theme } = useTypedSelector(state => state.theme)

  const [isModalLangChoiceVisible, setIsModalLangChoiceVisible] = useState(true)
  const [selectedLang, setSelectedLang] = useState<null | ILangList>(null)

  const handleSelectLang = (l: ILangList) => {
    setSelectedLang(l)
  }

  return (
    <div className={`${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-900'} px-2 py-3`}>
      {isModalLangChoiceVisible && <LangModal lang={selectedLang} />}
      <div className='text-3xl mb-1 font-medium'>{t('Languages')}</div>
      <div className='mb-5'>{t('You can add more than one')}</div>
      <div className=''>
        {writingLang.map(lang => (
          <div
            key={lang.code}
            className={`${theme === 'dark' ? 'border-zinc-900' : ''} mb-3 border-b-2 pb-3`}
            onClick={() => handleSelectLang(lang)}
          >
            <div className='font-medium'>{lang.name}</div>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{lang.engName}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Step3