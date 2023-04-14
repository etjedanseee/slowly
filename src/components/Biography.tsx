import React, { ChangeEvent, useEffect, useState } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import SignUpNavigation from '../UI/SignUpNavigation'
import { useTranslation } from 'react-i18next'

interface BiographyProps {
  isBiographyVisible: boolean,
  onClose: () => void,
  onSave: (text: string) => void,
  userBiography: string
}

const Biography = ({ isBiographyVisible, onClose, onSave, userBiography }: BiographyProps) => {
  const { theme } = useTypedSelector(state => state.theme)
  const { t } = useTranslation()
  const [isBiographyValid, setIsBiographyValid] = useState(false)
  const [newBiography, setNewBiography] = useState(userBiography)

  const handleNewBiographyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewBiography(e.target.value)
  }

  const onCloseClick = () => {
    setNewBiography(userBiography)
    onClose()
  }

  useEffect(() => {
    if (newBiography.length > 0 && newBiography.length < 5000) {
      setIsBiographyValid(true)
    } else {
      setIsBiographyValid(false)
    }
  }, [newBiography])

  return (
    <div className={`fixed top-0 left-0 w-full h-screen z-50 overflow-hidden
      ${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-900'} ${isBiographyVisible ? '' : 'hidden'}`}
    >
      <SignUpNavigation
        isStepsValid={[isBiographyValid]}
        onNextClick={() => onSave(newBiography)}
        onCloseClick={onCloseClick}
        onPrevClick={() => { }}
        step={1}
        buttonText='save'
      />

      <textarea
        className='bg-zinc-800 text-white w-full py-20 px-2 overflow-auto h-full text-lg outline-none'
        value={newBiography}
        onChange={handleNewBiographyChange}
        placeholder={t('writeAboutYou') || ''}
      />
    </div>
  )
}

export default Biography