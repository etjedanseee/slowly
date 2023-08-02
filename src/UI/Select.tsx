import React, { MouseEvent, useEffect } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useTranslation } from 'react-i18next'
import MyButton from './MyButton'

interface SelectProps<T> {
  title: string,
  onSelectOption: (option: T | any) => void,
  options: T[],
  selectedOption: T,
  onSave: () => void,
  onClose: () => void,
}

const Select = <T,>({ title, options, onSelectOption, selectedOption, onSave, onClose }: SelectProps<T>) => {
  const { t } = useTranslation()
  const { theme } = useTypedSelector(state => state.theme)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const handleCancelCloseSelect = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <div className={`fixed top-0 left-0 nMb:left-1/2 nMb:-translate-x-1/2 nMb:max-w-[425px] 
      w-full min-h-screen z-30 flex justify-center items-center px-10 py-10
      ${theme === 'dark' ? 'bg-opacity-70' : ''} bg-black
      `}
      onClick={onClose}
    >
      <div className={`
        ${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-slate-200 text-zinc-900'} 
        w-full min-h-[400px] max-h-full rounded-md flex flex-col
      `}
        onClick={handleCancelCloseSelect}
      >
        <>
          <div className='px-3 py-2 text-lg'>{t(title)}</div>
          <div className={`${theme === 'dark' ? 'bg-black' : 'bg-gray-500'} w-full h-[1px]`} />
        </>

        <div className='flex-1 px-3 flex flex-col gap-y-2 py-3 overflow-y-auto'>
          {options.map((option, indx) => (
            <div
              key={indx}
              onClick={() => onSelectOption(option)}
              className='flex items-center gap-x-4'
            >
              <div className={`border-yellow-400 border-2 h-5 w-5 flex items-center justify-center`}>
                <div className={`${selectedOption === option ? 'bg-yellow-400' : 'bg-transparent'} h-3 w-3`} />
              </div>
              <div>{t(`${option}`)}</div>
            </div>
          ))}
        </div>

        <div className='flex'>
          <MyButton
            color='black'
            onClick={onClose}
            title='cancel'
            variant='rounded-none'
            p='py-2'
          />
          <MyButton
            color='yellow'
            onClick={onSave}
            title='save'
            variant='rounded-none'
            p='py-2'
          />
        </div>
      </div>
    </div>
  )
}

export default Select