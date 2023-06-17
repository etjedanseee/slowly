import React, { useState } from 'react'
import MultySelect from './MultySelect'
import { sexArr } from '../utils/consts'
import { ReactComponent as ArrowDownIcon } from '../assets/arrowDown.svg'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useTranslation } from 'react-i18next'
import { SexType } from '../types/Auth/auth'

interface SelectGenderProps {
  userPreferenceSex: SexType[],
  onSave: (editedPreferenceSex: SexType[]) => void,
}

const SelectGender = ({ userPreferenceSex, onSave }: SelectGenderProps) => {
  const { theme } = useTypedSelector(state => state.theme)
  const { t } = useTranslation()

  const [preferenceSex, setPreferenceSex] = useState<SexType[]>(userPreferenceSex)
  const [isPrefSexMultySelectVisible, setIsPrefSexMultySelectVisible] = useState(false)

  const handlePrefSexMultySelectVisible = () => {
    setIsPrefSexMultySelectVisible(prev => !prev)
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

  const onSavePreferenceSex = (editedPreferenceSex: SexType[]) => {
    onSave(editedPreferenceSex)
    handlePrefSexMultySelectVisible()
  }

  const onClosePreferenceSexMultySelect = () => {
    setPreferenceSex(userPreferenceSex)
    handlePrefSexMultySelectVisible()
  }

  return (
    <div className='flex justify-between mb-3 items-center relative'>
      <div>{t('selectGender')}</div>

      <div>
        <MultySelect
          options={sexArr}
          isMenuVisible={isPrefSexMultySelectVisible}
          onSelectOption={handlePreferenceSex}
          selectedOptions={preferenceSex}
          onClose={onClosePreferenceSexMultySelect}
          selectTitle='sex'
          onSave={onSavePreferenceSex}
        />
        <div
          onClick={handlePrefSexMultySelectVisible}
          className='flex items-center gap-x-1'
        >
          <div>
            {userPreferenceSex.length === 3
              ? t('Any')
              : userPreferenceSex.length === 2
                ? t(userPreferenceSex[0]) + ', ' + t(userPreferenceSex[1])
                : t(userPreferenceSex[0])
            }
          </div>
          <ArrowDownIcon className={`h-5 w-5 ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`} />
        </div>

      </div>
    </div>
  )
}

export default SelectGender