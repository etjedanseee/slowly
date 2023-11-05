import React from 'react'
import { buttonColor, buttonVariant } from './ui'
import { useTranslation } from 'react-i18next';

interface MyButtonProps {
  color: buttonColor,
  title: string,
  variant?: buttonVariant,
  disabled?: boolean,
  p?: string,
  onClick: () => void,
}

const MyButton = ({ color, title, variant, disabled, onClick, p }: MyButtonProps) => {
  const { t } = useTranslation();

  let buttonColor;
  if (color === 'black') {
    buttonColor = disabled ? 'bg-black text-gray-500' : 'bg-black text-white'
  } else {
    buttonColor = disabled ? 'bg-yellow-400 bg-opacity-50 text-zinc-900' : 'bg-yellow-400 text-black'
  }

  return (
    <div
      className={`${buttonColor} ${variant || 'rounded-xl'} w-full px-4 ${p ? p : 'py-1'} text-center font-medium select-none cursor-pointer`}
      onClick={onClick}
    >
      {t(title)}
    </div>
  )
}

export default MyButton