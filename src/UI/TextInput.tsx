import React, { ChangeEvent, useState } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { ReactComponent as EyeIcon } from '../assets/eye.svg'

interface TextInputProps {
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
  value: string,
  placeholder: string,
  onBlur?: () => void,
  onFocus?: () => void,
  isPassword?: boolean,
  autoCompleteValue?: string
}

const TextInput = ({ placeholder = '', onInputChange, value, onBlur = () => { }, onFocus = () => { }, isPassword, autoCompleteValue }: TextInputProps) => {
  const { theme } = useTypedSelector(state => state.theme)
  const [isPasswordVisible, setIsPasswordVisible] = useState(!isPassword)

  const handlePasswordVisible = () => {
    setIsPasswordVisible(prev => !prev)
  }

  return (
    <div className='relative'>
      <input
        value={value}
        type={!isPasswordVisible && isPassword ? 'password' : 'text'}
        onChange={(e) => onInputChange(e)}
        placeholder={placeholder}
        autoComplete={autoCompleteValue || 'on'}
        className={`${theme === 'dark' ? 'border-black bg-zinc-800 text-white' : 'border-gray-500 bg-gray-100 text-zinc-900'} 
          w-full border-b px-4 py-1 mb-1 outline-none flex items-center
        `}
        spellCheck={false}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {isPassword && (
        <EyeIcon
          className={`absolute top-2 right-2 h-5 w-5 hover:cursor-pointer ${theme === 'dark' ? 'fill-slate-300' : 'fill-gray-500'}`}
          onClick={handlePasswordVisible}
        />
      )
      }
    </div>
  )
}

export default TextInput