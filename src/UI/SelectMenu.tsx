import React, { MouseEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useTypedSelector } from '../hooks/useTypedSelector'

interface SelectMenuProps<T> {
  onSelectOption: (e: MouseEvent<HTMLDivElement>, option: T | any) => void,
  isMenuVisible: boolean,
  options: T[],
}

const SelectMenu = <T,>({ onSelectOption, isMenuVisible, options }: SelectMenuProps<T>) => {
  const { t } = useTranslation()
  const { theme } = useTypedSelector(state => state.theme)

  return (
    <div className={`absolute right-0 top-full z-50 px-4 py-2 flex flex-col gap-y-5 mt-2 overflow-y-scroll max-h-52
      ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-400'} ${isMenuVisible ? '' : 'hidden'}
    `}>
      {options.map((option, indx) => (
        <div
          key={indx}
          onClick={(e) => onSelectOption(e, option)}
          className='flex items-center gap-x-4'
        >
          <div>{t(`${option}`)}</div>
        </div>
      ))}

    </div>
  )
}

export default SelectMenu