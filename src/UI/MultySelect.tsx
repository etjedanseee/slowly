import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTypedSelector } from '../hooks/useTypedSelector'
import MyButton from './MyButton'

interface MultySelectProps<T> {
  onSelectOption: (option: T | any) => void,
  isMenuVisible: boolean,
  options: T[],
  selectedOptions: T[],
  onClose: () => void,
  selectTitle: string
}

const MultySelect = <T,>({ onSelectOption, isMenuVisible, options, selectedOptions, onClose, selectTitle }: MultySelectProps<T>) => {
  const { t } = useTranslation()
  const { theme } = useTypedSelector(state => state.theme)

  return (
    <div className={`fixed left-0 top-0 w-full h-full z-50 flex flex-col justify-between gap-y-4 overflow-hidden py-3
      ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-400'} ${isMenuVisible ? '' : 'hidden'}
    `}>
      <div className='w-full overflow-y-auto flex flex-col gap-y-3 text-xl py-20'>

        <div className={`w-full fixed top-2 left-0 z-50 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'}`}>
          <div className='text-3xl font-medium px-5'>{t(selectTitle)}</div>
          <div className={`${theme === 'dark' ? 'bg-zinc-700' : 'bg-slate-200'} px-5 flex items-center gap-x-3 first-line:mb-2`}>
            <div>{t(selectTitle)}:</div>
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
              className={`${selectedOptions.find(item => item === option) ? 'bg-yellow-500 shadow-md shadow-blue-300' : ' border-white'} 
              p-3 border-2 transition-colors duration-500
            `} />
            <div>{t(`${option}`)}</div>
          </div>
        ))}
      </div>

      <div className='w-full fixed bottom-3 left-0'>
        <MyButton
          color='black'
          title='close'
          variant='roundedXl'
          onClick={onClose}
          p='py-1'
        />
      </div>
    </div>
  )
}

export default MultySelect