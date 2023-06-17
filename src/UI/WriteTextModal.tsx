import React, { useEffect, useState, ChangeEvent } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { ReactComponent as CloseIcon } from '../assets/close.svg'
import MyButton from './MyButton'
import { useTranslation } from 'react-i18next'

interface WriteTextModalProps {
  defaultText: string,
  onClose: () => void,
  onSave: (text: string) => void
}

const WriteTextModal = ({ onClose, onSave, defaultText }: WriteTextModalProps) => {
  const { theme } = useTypedSelector(state => state.theme)
  const { t } = useTranslation()
  const [letterText, setLetterText] = useState(defaultText || '')

  const handleLetterText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setLetterText(e.target.value)
  }

  const onSaveClick = () => {
    onSave(letterText)
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div className={`fixed min-h-full h-full w-full top-0 left-0 z-20 px-3 py-20 
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
            onClick={onSaveClick}
            title='save'
          />
        </div>
      </div>

      <textarea
        className='resize-none w-full min-h-full h-full flex flex-col outline-none bg-transparent overflow-y-auto break-words  overflow-x-hidden'
        placeholder={t('startTyping') || 'Click here to start typing'}
        value={letterText}
        onChange={handleLetterText}
      ></textarea>

    </div>
  )
}

export default WriteTextModal