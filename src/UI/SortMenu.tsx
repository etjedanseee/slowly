import React, { } from 'react'
import { useTranslation } from 'react-i18next'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { sortFriendsByNames } from '../utils/consts'

interface SortMenuProps {
  close: () => void,
  onChangeSort: (sort: string) => void,
  selectedSort: string
}


const SortMenu = ({ close, onChangeSort, selectedSort }: SortMenuProps) => {
  const { t } = useTranslation()
  const { theme } = useTypedSelector(state => state.theme)

  return (
    <div
      className={`fixed top-0 left-0 w-full  h-screen nMb:left-1/2 nMb:-translate-x-1/2 nMb:max-w-[425px] 
        z-50 bg-black bg-opacity-70 flex flex-col justify-end cursor-pointer
      `}
      onClick={close}
    >
      <div
        className={`${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'} rounded-t-lg py-3 px-4 cursor-default`}
        onClick={e => e.stopPropagation()}
      >
        <div className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'} text-center mb-2`}>{t('sortBy')}</div>
        <div className='flex flex-col gap-y-2'>
          {sortFriendsByNames.map(sort => (
            <div
              key={sort}
              onClick={() => onChangeSort(sort)}
              className='cursor-pointer'
            >{t(sort)}{selectedSort === sort && ' *'}</div>
          ))}

          <div
            onClick={close}
            className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'} cursor-pointer`}
          >
            {t('cancel')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortMenu