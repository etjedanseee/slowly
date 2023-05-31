import React, { ChangeEvent, useEffect, useState } from 'react'
import { IUser } from '../types/Auth/auth'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { ReactComponent as CloseIcon } from '../assets/close.svg'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import MyButton from '../UI/MyButton'

interface WriteLetterProps {
  otherUser: IUser,
  deliveredTime: number,
  onClose: () => void
}

const WriteLetter = ({ deliveredTime, otherUser, onClose }: WriteLetterProps) => {
  const { theme } = useTypedSelector(state => state.theme)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [letterText, setLetterText] = useState('')

  const onUserProfileClick = () => {
    navigate('/users/' + otherUser.id)
  }

  const handleLetterText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setLetterText(e.target.value)
  }

  const onSendLetter = () => {

  }

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
      <div className={`absolute top-0 left-0 w-full py-3 px-3 flex items-center gap-x-4
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
      </div>

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