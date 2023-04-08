import React, { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useTypedSelector } from '../hooks/useTypedSelector'

interface SelectMenuProps {
  onSelectOption: (e: MouseEvent<HTMLDivElement>, option: string) => void,
  isMenuVisible: boolean,
  arr: string[]
}

const SelectMenu = ({ onSelectOption, isMenuVisible, arr }: SelectMenuProps) => {
  const { t } = useTranslation()
  const { theme } = useTypedSelector(state => state.theme)

  return (
    <div className={`absolute right-0 top-full z-50 px-4 py-2 flex flex-col gap-y-5 mt-2 overflow-y-scroll h-52
      ${theme === 'dark' ? 'bg-zinc-800' : ''} ${isMenuVisible ? '' : 'hidden'}
    `}>
      {arr.map(option => (
        <div
          key={option}
          onClick={(e) => onSelectOption(e, option)}
        >
          {t(option)}
        </div>
      ))}

    </div>
  )
}

export default SelectMenu