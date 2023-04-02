import React from 'react'
import { buttonColor, buttonVariant } from './ui'

interface MyButtonProps {
  color: buttonColor,
  title: string,
  variant: buttonVariant,
  onClick: () => void
}

const MyButton = ({ color, title, variant }: MyButtonProps) => {
  const buttonColor = color === 'black' ? 'bg-black text-white' : 'bg-yellow-400 text-black'
  const variantStyle = variant === 'roundedLg' ? 'rounded-lg' : variant === 'roundedFull' ? 'rounded-full' : 'rounded-xl'

  return (
    <div className={`text-2xl ${buttonColor} ${variantStyle} mb-5 px-4 py-2 text-center font-medium`}>
      {title}
    </div>
  )
}

export default MyButton