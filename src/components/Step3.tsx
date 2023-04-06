import React, { useState, useEffect, MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { ReactComponent as CloseIcon } from '../assets/close.svg'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { ILang } from '../types/User/user'
import LangModal from '../UI/LangModal'
import { writingLang } from '../utils/consts'

interface Step3Props {
  setStepData: (data: ILang[]) => void,
  step3Data: ILang[],
  setIsStep3Valid: (bool: boolean) => void
}

const Step3 = ({ setIsStep3Valid, setStepData, step3Data }: Step3Props) => {
  const { t } = useTranslation()
  const { theme } = useTypedSelector(state => state.theme)

  const [selectedLang, setSelectedLang] = useState<null | ILang>(null)
  const [isModalLangChoiceVisible, setIsModalLangChoiceVisible] = useState(false)
  const [isControlMenuVisible, setIsContolMenuVisible] = useState(false)

  const handleSelectLang = (l: ILang) => {
    setSelectedLang(l)
    handleModalLangVisible()
  }

  const handleModalLangVisible = () => {
    setIsModalLangChoiceVisible(prev => !prev)
  }

  const handleControlMenuVisible = () => {
    setIsContolMenuVisible(prev => !prev)
  }

  const onControlMenuClose = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    handleControlMenuVisible()
  }

  const handleAddLang = (lang: ILang) => {
    const isLangAdded = step3Data.find(l => l.code === lang.code)
    if (isLangAdded) {
      const otherLangs = step3Data.filter(l => l.code !== lang.code)
      setStepData([...otherLangs, lang])
    } else {
      setStepData([...step3Data, lang])
    }
    handleModalLangVisible()
  }

  const deleteLang = () => {
    if (selectedLang !== null) {
      const otherLangs = step3Data.filter(l => l.code !== selectedLang.code)
      setStepData([...otherLangs])
    }
  }

  useEffect(() => {
    if (step3Data.length) {
      setIsStep3Valid(true)
    } else {
      setIsStep3Valid(false)
    }
  }, [step3Data, setIsStep3Valid])

  return (
    <div className={`${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-900'} px-2 py-3 relative`}>
      {isModalLangChoiceVisible && (
        <LangModal
          lang={selectedLang}
          handleModalLangVisible={handleModalLangVisible}
          onAddLang={handleAddLang}
        />
      )}

      {isControlMenuVisible && (
        <div
          className={`fixed top-0 left-0 h-screen w-full bg-opacity-60 flex flex-col justify-end items-center z-50 bg-black`}
          onClick={onControlMenuClose}
        >
          <CloseIcon className='h-6 w-6 fill-gray-200 mb-2' />
          <div className={`${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} 
            w-full flex flex-col p-4 rounded-t-xl`
          }>
            <div className={`
            ${theme === 'dark' ? 'text-yellow-500 font-medium' : 'text-yellow-400 font-bold'} 
            text-xl text-center mb-3`}
            >{selectedLang?.name}</div>
            <div className={`${theme === 'dark' ? '' : 'font-medium'} mb-3`} onClick={handleModalLangVisible}>{t('updateProficiency')}</div>
            <div className='mb-3 text-red-700 font-medium' onClick={deleteLang}>{t('deleteLang')}</div>
          </div>
        </div>
      )}

      <div className='text-3xl mb-1 font-medium'>{t('Languages')}</div>
      <div className='mb-5'>{t('You can add more than one')}</div>

      {step3Data.length > 0 && (
        <div className='mb-4'>
          {step3Data.map(addedLang => (
            <div
              key={addedLang.code + 'added'}
              className={`${theme === 'dark' ? 'border-zinc-900' : ''} mb-3 border-b-2 pb-3 flex items-center justify-between`}
            >
              <div className='flex flex-col'>
                <div className={`font-medium ${theme === 'dark' ? 'text-yellow-400' : 'text-black'} leading-none`}>{addedLang.name}</div>
                <div className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{addedLang.engName}</div>

                <div className='flex gap-x-1'>
                  {[1, 2, 3, 4, 5].map(ind => (
                    <div
                      key={ind}
                      className={`${addedLang.level >= ind
                        ? 'border-yellow-400 bg-yellow-400'
                        : theme === 'dark' ? 'border-white bg-transparent' : 'border-gray-400'
                        } 
                      rounded-full border-2 h-3 w-3`}
                    ></div>
                  ))}
                </div>
              </div>

              <div
                className='flex gap-x-1 pr-2'
                onClick={() => { setSelectedLang(addedLang); handleControlMenuVisible(); }}
              >{[0, 1, 2].map(() => (
                <div className={`h-1 w-1 ${theme === 'dark' ? 'bg-white' : 'bg-gray-400'} rounded-full`}></div>
              ))}</div>
            </div>
          ))}
        </div>
      )}

      <div className=''>
        {writingLang.filter(lng => !step3Data.find(l => l.code === lng.code)).map(lang => (
          <div
            key={lang.code}
            className={`${theme === 'dark' ? 'border-zinc-900' : ''} mb-3 border-b-2 pb-3`}
            onClick={() => handleSelectLang(lang)}
          >
            <div className='font-medium leading-none'>{lang.name}</div>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{lang.engName}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Step3