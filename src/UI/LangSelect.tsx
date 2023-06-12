import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IAppLangs } from '../types/Theme/theme'
import { appLangType } from '../types/Theme/theme'
import LangCheckBox from './LangCheckBox'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useActions } from '../hooks/useActions'
import { ReactComponent as ArrowDownIcon } from '../assets/arrowDown.svg'
import MyButton from './MyButton'

const LangSelect = () => {
  const { t } = useTranslation()
  const { changeLanguage } = useActions()
  const { theme, lang } = useTypedSelector(state => state.theme)

  const appLangsArr: IAppLangs[] = [{ name: 'English', lang: 'en', checked: lang === 'en' }, { name: 'Українська', lang: 'ua', checked: lang === 'ua' }]

  const [langs, setlangs] = useState(appLangsArr)
  const [isLangsVisible, setIsLangsVisible] = useState(false)

  const onLangCheckBoxChange = (lang: appLangType) => {
    setlangs([...langs].map(l => l.lang === lang ? { ...l, checked: true } : { ...l, checked: false }))
  }

  const onChangeAppLang = () => {
    const selectedLang = langs.find(l => l.checked)?.lang
    if (selectedLang) {
      changeLanguage(selectedLang)
    }
    handleIsAppLangsVisible()
  }

  const handleIsAppLangsVisible = () => {
    setIsLangsVisible(prev => !prev)
  }

  return (
    <div className={`flex items-center justify-between px-2 py-3 mb-6 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-200'}`}>
      <div className='text-lg'>{t('appLang')}</div>

      {isLangsVisible
        ? (
          <div className='fixed top-0 left-0 min-h-screen w-full z-10 bg-inherit px-4 py-4'>
            <div className='text-lg mb-4'>{t('appLang')}</div>
            <div className='flex flex-col gap-y-1'>
              {langs.map(l => (
                <LangCheckBox
                  key={l.name}
                  cheked={l.checked}
                  name={l.name}
                  onLangCheckBoxChange={onLangCheckBoxChange}
                  title={l.lang}
                />
              ))}
            </div>
            <div className='flex gap-x-4 mt-6'>
              <MyButton
                color='yellow'
                onClick={onChangeAppLang}
                title='change'
              />
              <MyButton
                color='black'
                onClick={handleIsAppLangsVisible}
                title='close'
              />
            </div>
          </div>
        )
        : (
          <div
            onClick={handleIsAppLangsVisible}
            className='flex items-center gap-x-2'
          >
            <div className='text-lg font-medium'>{lang}</div>
            <ArrowDownIcon className={`h-5 w-5 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`} />
          </div>
        )
      }
    </div>
  )
}

export default LangSelect