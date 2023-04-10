import React, { useState, MouseEvent } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector';
import { ILang } from '../types/Auth/auth';
import LangModal from '../UI/LangModal';
import { ReactComponent as CloseIcon } from '../assets/close.svg'
import { useTranslation } from 'react-i18next';
import { writingLang } from '../utils/consts';
import MyButton from '../UI/MyButton';


interface UserlangsProps {

}


const UserLangs = () => {
  const { theme } = useTypedSelector(state => state.theme)
  const { user } = useTypedSelector(state => state.auth)
  const { t } = useTranslation()

  const [userLangs, setUserLangs] = useState<ILang[]>(user?.languages || [])
  const [selectedLang, setSelectedLang] = useState<null | ILang>(null)
  const [isModalLangChoiceVisible, setIsModalLangChoiceVisible] = useState(false)
  const [isControlMenuVisible, setIsContolMenuVisible] = useState(false)
  const [isOtherLangsVisible, setIsOtherLangsVisible] = useState(false)

  const handleOtherLangsVisible = () => {
    setIsOtherLangsVisible(prev => !prev)
  }

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
    const isLangAdded = userLangs.find(l => l.code === lang.code)
    if (isLangAdded) {
      const otherLangs = userLangs.filter(l => l.code !== lang.code)
      setUserLangs([...otherLangs, lang])
    } else {
      setUserLangs([...userLangs, lang])
    }
    handleModalLangVisible()
  }

  const deleteLang = () => {
    if (selectedLang !== null) {
      const otherLangs = userLangs.filter(l => l.code !== selectedLang.code)
      setUserLangs([...otherLangs])
    }
  }

  return (
    <>
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
            <div className={`${theme === 'dark' ? '' : 'font-medium'} mb-3`} onClick={handleModalLangVisible}>
              {t('updateProficiency')}
            </div>
            <div className='mb-3 text-red-700 font-medium' onClick={deleteLang}>{t('deleteLang')}</div>
          </div>
        </div>
      )}

      {userLangs.length > 0 && (
        <div className=''>
          {userLangs.map(addedLang => (
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
              >{[0, 1, 2].map(i => (
                <div key={i} className={`h-1 w-1 ${theme === 'dark' ? 'bg-white' : 'bg-gray-400'} rounded-full`}></div>
              ))}</div>
            </div>
          ))}

          {isOtherLangsVisible && (
            <>
              {writingLang.filter(lng => !userLangs.find(l => l.code === lng.code)).map(lang => (
                <div
                  key={lang.code}
                  className={`${theme === 'dark' ? 'border-zinc-900' : ''} mb-3 border-b-2 pb-3`}
                  onClick={() => handleSelectLang(lang)}
                >
                  <div className='font-medium leading-none'>{lang.name}</div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{lang.engName}</div>
                </div>
              ))}
            </>
          )}

          <MyButton
            color='black'
            onClick={handleOtherLangsVisible}
            title={isOtherLangsVisible ? 'hide' : 'showAll'}
            variant='roundedXl'
            p='py-1'
          />
        </div>
      )}

    </>
  )
}

export default UserLangs