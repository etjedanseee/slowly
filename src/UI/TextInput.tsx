import React, { ChangeEvent } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'

interface TextInputProps {
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
  value: string,
  placeholder: string,
  onBlur: () => void
}

//если он будет использоваться не только при регистрации то нужно переписать стили
const TextInput = ({ placeholder, onInputChange, value, onBlur }: TextInputProps) => {
  // const { theme } = useTypedSelector(state => state.theme)

  return (
    <input
      value={value}
      onChange={(e) => onInputChange(e)}
      placeholder={placeholder}
      className='w-full border-b border-black bg-zinc-800 px-4 pb-1 mb-1 outline-none'
      spellCheck={false}
      onBlur={onBlur}
    >
    </input>
  )
}

export default TextInput