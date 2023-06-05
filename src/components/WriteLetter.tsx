import React, { ChangeEvent, useEffect, useState } from 'react'
import { IUser } from '../types/Auth/auth'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { ReactComponent as CloseIcon } from '../assets/close.svg'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import MyButton from '../UI/MyButton'
import { calcWordsCount } from '../utils/calcWordsCount'
import { sendLetter } from '../utils/sendLetter'
import { checkCommonLanguages } from '../utils/checkCommonLanguages'

interface WriteLetterProps {
  otherUser: IUser,
  deliveredTime: number,
  onClose: () => void
}

const WriteLetter = ({ deliveredTime, otherUser, onClose }: WriteLetterProps) => {
  const { theme } = useTypedSelector(state => state.theme)
  const { user } = useTypedSelector(state => state.auth)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [letterText, setLetterText] = useState('')
  const [signsCount, setSignsCount] = useState(0)
  const [wordsCount, setWordsCount] = useState(0)
  const [isHelpMenuVisible, setIsHelpMenuVisible] = useState(false)

  const onUserProfileClick = () => {
    navigate('/users/' + otherUser.id)
  }

  const handleLetterText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setLetterText(e.target.value)
  }

  const handleHelpMenuVisible = () => {
    setIsHelpMenuVisible(prev => !prev)
  }

  const onSendLetter = () => {
    if (user && !!letterText.length) {
      sendLetter(user.id, otherUser.id, letterText, deliveredTime)
      onClose()
    }
  }

  useEffect(() => {
    setSignsCount(letterText.length)
    setWordsCount(calcWordsCount(letterText))
  }, [letterText])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div className={`fixed h-full w-full top-0 left-0 z-20 px-3 pt-20
      ${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-slate-200 text-zinc-900'}
    `}>
      <div className={`absolute top-0 left-0 w-full py-3 px-3 flex items-center gap-x-7
        ${theme === 'dark' ? 'bg-zinc-950 text-white' : 'bg-slate-300 text-zinc-900'}
      `}
      >
        <div className='flex-1'>
          <CloseIcon
            className={`w-6 h-6 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
            onClick={onClose}
          />
        </div>
        <div>
          <MyButton
            color='yellow'
            onClick={onSendLetter}
            title='send'
          />
        </div>
        <div
          className='flex flex-col justify-center gap-y-[1px] mr-1'
          onClick={handleHelpMenuVisible}
        >
          {[0, 1, 2].map((_, i) => <div key={i} className='w-1 h-1 rounded-full bg-white'></div>)}
        </div>
      </div>

      {/* дописать закрытие по фону */}
      {isHelpMenuVisible && (
        <div className={`absolute top-16 right-2 py-2 rounded-md px-2 ${theme === 'dark' ? 'bg-zinc-900' : ''}`}>
          <div className='flex items-center justify-between gap-x-2'>
            <div>{t('words')}:</div>
            <div className='font-medium'>{wordsCount}</div>
          </div>
          <div className='flex items-center justify-between gap-x-2'>
            <div>{t('signs')}:</div>
            <div className='font-medium'>{signsCount}</div>
          </div>
        </div>)
      }

      <div
        className='flex items-center gap-x-3 mb-4'
        onClick={onUserProfileClick}
      >
        <img
          src={otherUser.info.avatarUrl}
          className='rounded-full w-12 h-12'
          alt="Other user avatar"
        />
        <div className='text-sm'>{otherUser.info.nickName}</div>
      </div>

      {!checkCommonLanguages(user?.languages || [], otherUser.languages) && (
        <div className='text-red-500 text-sm mb-2'>{t('understood')}</div>
      )}

      <div className='bg-black h-[1px] w-full mb-4'></div>

      {/* проверить паддинг снизу(можно без него) */}
      <textarea
        className='resize-none w-full h-full flex flex-col outline-none bg-transparent overflow-y-auto pb-28'
        placeholder={t('startTyping') || 'Click here to start typing'}
        value={letterText}
        onChange={handleLetterText}
      ></textarea>

    </div>
  )
}

export default WriteLetter