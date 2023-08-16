import React from 'react'
import { ReactComponent as PlaneIcon } from '../assets/plane.svg'
import { useTypedSelector } from '../hooks/useTypedSelector'

interface WriteLetterButtonProps {
  onWriteLetterClick: () => void
}

const WriteLetterButton = ({ onWriteLetterClick }: WriteLetterButtonProps) => {

  const { theme } = useTypedSelector(state => state.theme)

  return (
    <div className={`fixed bottom-3 right-3 z-10 rounded-full border-2 bg-gray-300
        ${theme === 'dark' ? 'border-black' : ' border-zinc-500'} 
      `}>
      <PlaneIcon
        className={`h-12 w-12 p-2 rounded-full fill-black bg-gray-300 cursor-pointer`}
        onClick={onWriteLetterClick}
      />
    </div>
  )
}

export default WriteLetterButton