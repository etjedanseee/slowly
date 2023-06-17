import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useTypedSelector } from '../hooks/useTypedSelector'
import MyButton from './MyButton'

interface MultySelectProps<T> {
  onSelectOption: (option: T | any) => void,
  options: T[],
  selectedOptions: T[],
  onClose: () => void,
  onSave: (editedOptions: T[]) => void,
  selectTitle: string
}

const MultySelect = <T,>({ onSelectOption, options, selectedOptions, onClose, onSave, selectTitle }: MultySelectProps<T>) => {
  const { t } = useTranslation()
  const { theme } = useTypedSelector(state => state.theme)

  const onSaveClick = () => {
    onSave(selectedOptions)
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <div className={`fixed left-0 top-0 w-full h-full z-50 flex flex-col justify-between gap-y-4 overflow-hidden py-3
      ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} 
    `}>
      <div className='w-full overflow-y-auto flex flex-col gap-y-3 text-xl py-20'>

        <div className={`w-full fixed top-0 left-0 z-50 py-3 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-slate-200'}`}>
          <div className='flex items-center justify-between px-5'>
            <div className='text-3xl font-medium'>{t(selectTitle)}</div>
            <div>{selectedOptions.length} / {options.length}</div>
          </div>
        </div>

        {options.map((option, indx) => (
          <div
            key={indx}
            onClick={() => onSelectOption(option)}
            className='flex items-center gap-x-4 px-5'
          >
            <div
              className={`${selectedOptions.find(item => item === option) ? 'bg-yellow-500 shadow-md shadow-blue-300' : ' '} 
              p-3 border-2 border-yellow-500 transition-colors duration-500
            `} />
            <div>{t(`${option}`)}</div>
          </div>
        ))}
      </div>

      <div className='w-full fixed bottom-3 left-0 flex items-center gap-x-2'>
        <MyButton
          color='black'
          title='close'
          onClick={onClose}
          p='py-2'
          variant='rounded-lg'
        />
        <MyButton
          color='yellow'
          title='save'
          onClick={onSaveClick}
          p='py-2'
          variant='rounded-lg'
        />
      </div>
    </div>
  )
}

export default MultySelect