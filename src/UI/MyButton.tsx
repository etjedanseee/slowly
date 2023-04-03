import React from 'react'
import { buttonColor, buttonVariant } from './ui'
import { useTranslation } from 'react-i18next';

interface MyButtonProps {
  color: buttonColor,
  title: string,
  variant: buttonVariant,
  onClick: () => void,
}

const MyButton = ({ color, title, variant }: MyButtonProps) => {
  const { t } = useTranslation();

  const buttonColor = color === 'black' ? 'bg-black text-white' : 'bg-yellow-400 text-zinc-900'
  const variantStyle = variant === 'roundedLg' ? 'rounded-lg' : variant === 'roundedFull' ? 'rounded-full' : 'rounded-xl'

  return (
    <div className={`${buttonColor} ${variantStyle} text-xl mb-5 px-4 py-2 text-center font-medium select-none`}>
      {t(title)}
    </div>
  )
}

export default MyButton