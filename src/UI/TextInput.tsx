import React, { ChangeEvent } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'

interface TextInputProps {
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
  value: string,
  placeholder?: string,
  onFocus: () => void,
}

const TextInput = ({ placeholder = '', onInputChange, value, onFocus }: TextInputProps) => {
  const { theme } = useTypedSelector(state => state.theme)

  return (
    <input
      value={value}
      onChange={(e) => onInputChange(e)}
      placeholder={placeholder}
      className={`${theme === 'dark' ? 'border-black bg-zinc-800' : 'border-gray-500 bg-gray-100'} 
        w-full border-b px-4 py-1 mb-1 outline-none flex items-center
      `}
      spellCheck={false}
      onFocus={onFocus}
    />
  )
}

export default TextInput