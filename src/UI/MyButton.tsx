import React from 'react'
import { buttonColor, buttonVariant } from './ui'
import { useTranslation } from 'react-i18next';

interface MyButtonProps {
  color: buttonColor,
  title: string,
  variant: buttonVariant,
  disabled?: boolean,
  onClick: () => void,
}

//при светлой теме и дизейбл поменять цвета
const MyButton = ({ color, title, variant, disabled, onClick }: MyButtonProps) => {
  const { t } = useTranslation();

  let buttonColor;
  if (color === 'black') {
    buttonColor = disabled ? 'bg-black text-white' : 'bg-black text-white'
  } else {
    buttonColor = disabled ? 'bg-yellow-400 bg-opacity-50 text-zinc-900' : 'bg-yellow-400 text-zinc-900'
  }
  const variantStyle = variant === 'roundedLg' ? 'rounded-lg' : variant === 'roundedFull' ? 'rounded-full' : 'rounded-xl'

  return (
    <div
      className={`${buttonColor} ${variantStyle} w-full px-4 py-2 text-center font-medium select-none`}
      onClick={onClick}
    >
      {t(title)}
    </div>
  )
}

export default MyButton