import React, { useState } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import Loader from '../UI/Loader'
import { useTranslation } from 'react-i18next'
import { ReactComponent as SearchFriendsIcon } from '../assets/searchFriends.svg'
import { ReactComponent as ArrowBackIcon } from '../assets/arrowBack.svg'
import { ReactComponent as ArrowDownIcon } from '../assets/arrowDown.svg'
import { useNavigate } from 'react-router-dom'
import MultySelect from '../UI/MultySelect'
import { sexArr } from '../utils/consts'
import { SexType } from '../types/Auth/auth'


const AutoSearch = () => {
  const { user } = useTypedSelector(state => state.auth)
  const { theme } = useTypedSelector(state => state.theme)
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [isIncludeUserCountryToSearch, setIsIncludeUserCountryToSearch] = useState(true)
  const [preferenceSex, setPreferenceSex] = useState<SexType[]>(user?.profile.sexPreference || [])
  const [isPrefSexMenuVisible, setIsPrefSexMenuVisible] = useState(false)

  const onGoBackClick = () => {
    navigate('/search')
  }

  const onIncludeUserCountryToSearchChange = () => {
    setIsIncludeUserCountryToSearch(prev => !prev)
  }

  const handlePrefSexMenuVisible = () => {
    setIsPrefSexMenuVisible(prev => !prev)
  }

  const handlePreferenceSex = (option: SexType) => {
    if (preferenceSex.find(prefS => prefS === option)) {
      if (preferenceSex.length !== 1) {
        setPreferenceSex(preferenceSex.filter(prefS => prefS !== option))
      }
    } else {
      setPreferenceSex([...preferenceSex, option])
    }
  }

  if (!user) {
    return <div className='flex justify-center py-20'><Loader size='16' /></div>
  }

  return (
    <div className={`${theme === 'dark' ? 'text-gray-200 bg-zinc-900' : 'text-gray-900 bg-gray-200'} min-h-screen pt-16`}>
      <div className='fixed top-0 left-0 py-3 px-3 w-full z-10 bg-inherit flex items-center justify-between gap-x-6'>
        <ArrowBackIcon
          className={`h-7 w-7 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
          onClick={onGoBackClick}
        />
        <div className='text-lg font-medium flex-1'>{t('autoSearch')}</div>
      </div>

      <div className='flex justify-center items-center mb-6'>
        <SearchFriendsIcon className={`h-32 w-32 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`} />
      </div>

      <div className={`text-xs px-2 mb-1`}>{t('target')}</div>
      <div className={`py-3 px-2 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'}`}>
        <div className='flex items-center justify-between mb-3'>
          <div className='text-sm'>{t('includeMyCountryInSearch')}</div>
          <div
            className={`border-yellow-500 border-2 h-5 w-5 flex items-center justify-center`}
            onClick={onIncludeUserCountryToSearchChange}
          >
            <div className={`${isIncludeUserCountryToSearch ? 'bg-yellow-500' : 'bg-transparent'} h-3 w-3`} />
          </div>
        </div>

        <div className='flex items-center justify-between mb-3 relative'>
          <div className='text-sm'>{t('sex')}</div>

          <div>
            <MultySelect
              options={sexArr}
              isMenuVisible={isPrefSexMenuVisible}
              onSelectOption={handlePreferenceSex}
              selectedOptions={preferenceSex}
              onClose={handlePrefSexMenuVisible}
              selectTitle='sex'
            />
            <div
              onClick={handlePrefSexMenuVisible}
              className='flex items-center gap-x-1'
            >
              <div>
                {preferenceSex.length === 3
                  ? t('Any')
                  : preferenceSex.length === 2
                    ? t(preferenceSex[0]) + ', ' + t(preferenceSex[1])
                    : t(preferenceSex[0])
                }
              </div>
              <ArrowDownIcon className={`h-5 w-5 ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`} />
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default AutoSearch