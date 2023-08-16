import React, { useState, MouseEvent } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector';
import { ILang, IUser } from '../types/Auth/auth';
import LangModal from '../UI/LangModal';
import { ReactComponent as CloseIcon } from '../assets/close.svg'
import { useTranslation } from 'react-i18next';
import { writingLangs } from '../utils/consts';
import MyButton from '../UI/MyButton';
import { useActions } from '../hooks/useActions';


interface UserlangsProps {
  userLangs: ILang[],
  setUserLangs: (selectedLangs: ILang[]) => void,
  user?: IUser,
  isShowAnotherLanguages: boolean
}

const UserLangs = ({ userLangs, setUserLangs, user, isShowAnotherLanguages }: UserlangsProps) => {
  const { theme } = useTypedSelector(state => state.theme)
  const { t } = useTranslation()
  const { updateUserLangs } = useActions()

  const [selectedLang, setSelectedLang] = useState<null | ILang>(null)
  const [isModalLangChoiceVisible, setIsModalLangChoiceVisible] = useState(false)
  const [isControlMenuVisible, setIsContolMenuVisible] = useState(false)
  const [isOtherLangsVisible, setIsOtherLangsVisible] = useState(isShowAnotherLanguages)

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
    const prevLang = userLangs.find(l => l.code === lang.code)
    if (prevLang && prevLang.level !== lang.level) {
      const otherLangs = userLangs.filter(l => l.code !== lang.code)
      if (user) {
        updateUserLangs(user, [...otherLangs, lang])
      }
      setUserLangs([...otherLangs, lang])
    } else if (!prevLang) {
      if (user) {
        updateUserLangs(user, [...userLangs, lang])
      }
      setUserLangs([...userLangs, lang])
    }
    handleModalLangVisible()
  }

  const deleteLang = () => {
    if (selectedLang === null) {
      setUserLangs([])
    } else {
      const otherLangs = userLangs.filter(l => l.code !== selectedLang.code)
      if (user && userLangs.length > 1) {
        updateUserLangs(user, otherLangs)
      }
      setUserLangs(otherLangs)
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
          className={`fixed top-0 left-0 nMb:left-1/2 nMb:-translate-x-1/2 nMb:max-w-[425px] 
            h-screen w-full bg-opacity-60 flex flex-col justify-end items-center z-50 bg-black cursor-pointer
          `}
          onClick={onControlMenuClose}
        >
          <CloseIcon className='h-6 w-6 fill-gray-200 mb-2 cursor-pointer' />
          <div className={`${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} 
              w-full flex flex-col p-4 rounded-t-xl cursor-default
            `}>
            <div className={`${theme === 'dark' ? 'text-yellow-500 font-medium' : 'text-yellow-400 font-bold'} text-xl text-center mb-3`}>
              {selectedLang?.name}
            </div>
            <div
              className={`${theme === 'dark' ? '' : 'font-medium'} mb-3 cursor-pointer`}
              onClick={handleModalLangVisible}
            >
              {t('updateProficiency')}
            </div>
            <div
              className='mb-3 text-red-700 font-medium cursor-pointer'
              onClick={deleteLang}
            >
              {t('deleteLang')}
            </div>
          </div>
        </div>
      )}

      <>
        {userLangs.map(addedLang => (
          <div
            key={addedLang.code + 'added'}
            className={`${theme === 'dark' ? 'border-zinc-900' : ''} mb-3 border-b-2 pb-3 flex items-center justify-between`}
          >
            <div className='flex flex-col'>
              <div className={`font-medium ${theme === 'dark' ? 'text-yellow-400' : 'text-black'} leading-none`}>
                {addedLang.name}
              </div>
              <div className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {addedLang.engName}
              </div>

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
              className='flex gap-x-1 p-2 pr-2 cursor-pointer'
              onClick={() => { setSelectedLang(addedLang); handleControlMenuVisible(); }}
            >{[0, 1, 2].map(i => (
              <div
                key={i}
                className={`h-1 w-1 rounded-full ${theme === 'dark' ? 'bg-white' : 'bg-gray-400'}`}
              />
            ))}</div>
          </div>
        ))}

        {(isOtherLangsVisible || !userLangs.length) && (
          <>
            {writingLangs.filter(lng => !userLangs.find(l => l.code === lng.code)).map(lang => (
              <div
                key={lang.code}
                className={`${theme === 'dark' ? 'border-zinc-900' : ''} mb-3 border-b-2 pb-3 cursor-pointer`}
                onClick={() => handleSelectLang(lang)}
              >
                <div className='font-medium leading-none'>{lang.name}</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{lang.engName}</div>
              </div>
            ))}
          </>
        )}

        {user && (
          <MyButton
            color='black'
            onClick={handleOtherLangsVisible}
            title={isOtherLangsVisible ? 'hide' : 'showAll'}
          />
        )}
      </>
    </>
  )
}

export default UserLangs