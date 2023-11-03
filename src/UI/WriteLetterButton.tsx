import React, { useEffect, useState } from 'react'
import { ReactComponent as PlaneIcon } from '../assets/plane.svg'
import { useTypedSelector } from '../hooks/useTypedSelector'

interface WriteLetterButtonProps {
  onWriteLetterClick: () => void
}

const WriteLetterButton = ({ onWriteLetterClick }: WriteLetterButtonProps) => {
  const { theme } = useTypedSelector(state => state.theme)
  const [buttonXPosition, setButtonXPosition] = useState({ left: '0' })

  const updateButtonXPosition = () => {
    const body = document.body;
    if (body) {
      const bodyWidth = body.offsetWidth
      const position = (window.innerWidth - bodyWidth) / 2 + bodyWidth - 12 - 48
      setButtonXPosition({ left: `${position}px` });
    }
  };

  useEffect(() => {
    updateButtonXPosition();
    window.addEventListener('resize', updateButtonXPosition);
    return () => {
      window.removeEventListener('resize', updateButtonXPosition);
    };
  }, [])

  return (
    <div
      className={`fixed bottom-3 z-10 rounded-full border-2 ${theme === 'dark' ? 'border-none' : ' border-zinc-500'}`}
      style={buttonXPosition}
    >
      <PlaneIcon
        className={`h-12 w-12 p-2 rounded-full fill-black bg-gray-300 cursor-pointer`}
        onClick={onWriteLetterClick}
      />
    </div>
  )
}

export default WriteLetterButton