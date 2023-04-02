import React from 'react'
import { buttonColor, buttonVariant } from './ui'

interface MyButtonProps {
  color: buttonColor,
  title: string,
  variant: buttonVariant,
  onClick: () => void,
}

const MyButton = ({ color, title, variant }: MyButtonProps) => {
  const buttonColor = color === 'black' ? 'bg-black text-white hover:bg-zinc-900' : 'bg-yellow-400 text-black hover:bg-yellow-300'
  const variantStyle = variant === 'roundedLg' ? 'rounded-lg' : variant === 'roundedFull' ? 'rounded-full' : 'rounded-xl'

  return (
    <div className={`
      text-2xl ${buttonColor} ${variantStyle} mb-5 px-4 py-2 text-center 
      font-medium transition-colors duration-500 select-none`
    }>
      {title}
    </div>
  )
}

export default MyButton