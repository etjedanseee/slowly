import React, { useState } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ReactComponent as ArrowBackIcon } from '../assets/arrowBack.svg'
import { ReactComponent as ArrowDownIcon } from '../assets/arrowDown.svg'
import { ReactComponent as CloseIcon } from '../assets/close.svg'
import { ReactComponent as MenuIcon } from '../assets/menu.svg'
import { ReactComponent as LanguageIcon } from '../assets/language.svg'
import { ReactComponent as ChattingIcon } from '../assets/chatting.svg'
import { ReactComponent as PencilIcon } from '../assets/navbarIcons/pencil.svg'
import CompactUserProfile from '../components/CompactUserProfile'
import { ILang, IUser, interest } from '../types/Auth/auth'
import MyButton from '../UI/MyButton'
import MultySelect from '../UI/MultySelect'
import Loader from '../UI/Loader'
import AgeRangeSelector from '../UI/AgeRangeSelector'

const ManuallySearch = () => {
  const { theme } = useTypedSelector(state => state.theme)
  const { user } = useTypedSelector(state => state.auth)
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [findedUsers, setFindedUsers] = useState<IUser[]>([])
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false)
  const [isIncludeUsersWithBiography, setIsIncludeUsersWithBiography] = useState(false)

  const [isLangsMultySelectVisible, setIsLangsMultySelectVisible] = useState(false)
  const [langs, setLangs] = useState<ILang[]>(user?.languages || [])
  const [selectedLangs, setSelectedLangs] = useState<ILang[]>(langs)

  const [isInterestsMultySelectVisible, setIsInterestsMultySelectVisible] = useState(false)
  const [interests, setInterests] = useState<interest[]>(user?.interests || [])
  const [selectedInterests, setSelectedInterests] = useState<interest[]>(interests)

  const [loading, setLoading] = useState(false)

  if (!user) {
    return <div className='flex justify-center py-20'><Loader size='16' /></div>
  }

  const handleInterestsMultySelectVisible = () => {
    setIsInterestsMultySelectVisible(prev => !prev)
  }

  const onSelectInterest = (intr: interest) => {
    if (interests.includes(intr)) {
      if (interests.length > 1) {
        setInterests(interests.filter(i => i !== intr))
      }
    } else {
      setInterests([...interests, intr])
    }
  }

  const onSaveSelectedInterests = () => {
    setSelectedInterests(interests)
    handleInterestsMultySelectVisible()
  }

  const onCloseInterests = () => {
    handleInterestsMultySelectVisible()
    setInterests(selectedInterests)
  }

  const handleLangsMultySelectVisible = () => {
    setIsLangsMultySelectVisible(prev => !prev)
  }

  const onSelectLang = (langName: string) => {
    const currentLang = user.languages.find(l => l.name === langName)
    const isCurrentLangSelected = langs.find(l => l.name === langName)
    if (currentLang) {
      if (isCurrentLangSelected && langs.length > 1) {
        setLangs(langs.filter(lang => lang.name !== langName))
      } else if (!isCurrentLangSelected) {
        setLangs([...langs, currentLang])
      }
    }
  }

  const onCloseLangsMultySelect = () => {
    setLangs(selectedLangs)
    handleLangsMultySelectVisible()
  }

  const onSaveSelectedLangs = () => {
    setSelectedLangs(langs)
    handleLangsMultySelectVisible()
  }

  const handleFilterModalVisible = () => {
    setIsFilterModalVisible(prev => !prev)
  }

  const onGoBackClick = () => {
    navigate(-1)
  }

  const onChangeIncludeUsersWithBio = () => {
    setIsIncludeUsersWithBiography(prev => !prev)
  }

  return (
    <div className={`px-3 py-16 min-h-screen ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-200'}`}>
      <div className='fixed top-0 left-0 w-full flex items-center justify-between gap-x-6 py-3 px-3'>
        <ArrowBackIcon
          className={`h-7 w-7 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
          onClick={onGoBackClick}
        />
        <div className='flex-1'>{t('coincidences')}</div>
        <MenuIcon
          onClick={handleFilterModalVisible}
          className={`h-7 w-7 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
        />
        <div className={`${theme === 'dark' ? 'bg-black' : 'bg-gray-500'} h-[1px] w-full absolute top-full left-0`} />
      </div>
      {!findedUsers.length && <div className='mb-2'>No match users</div>}
      <div className='grid grid-cols-2 gap-2'>
        {user && <CompactUserProfile profile={user} />}
      </div>

      {isFilterModalVisible && (
        <div className={`fixed top-0 left-0 z-10 min-h-screen w-full ${theme === 'dark' ? 'bg-zinc-800' : 'bg-slate-200'}`}>
          <div className={`fixed top-0 left-0 w-full flex items-center justify-between flex-wrap gap-y-3 py-3 px-2 
            ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-200'}`}>
            <CloseIcon
              className={`h-7 w-7 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
              onClick={handleFilterModalVisible}
            />
            <div>
              <MyButton
                color='yellow'
                onClick={handleFilterModalVisible}
                title='save'
                variant='rounded-full'
              />
            </div>
            <div className='w-full text-3xl uppercase font-medium tracking-wide'>{t('filters')}</div>
          </div>
          <div className='pt-32 px-2'>
            <div className='flex items-center gap-x-4 mb-4'>
              <ChattingIcon
                className={`h-6 w-6 fill-yellow-400`}
              />
              <div className='flex-1'>{t('withBiography')}</div>
              <div
                className={`border-yellow-400 border-2 h-5 w-5 flex items-center justify-center`}
                onClick={onChangeIncludeUsersWithBio}
              >
                <div className={`${isIncludeUsersWithBiography ? 'bg-yellow-400' : 'bg-transparent'} h-3 w-3`} />
              </div>
            </div>

            <div className='flex items-center gap-x-4 mb-4'>
              <LanguageIcon
                className={`h-6 w-6 fill-yellow-400`}
              />
              <div className='flex-1'>{t('langs')}</div>
              <div
                className='flex items-center gap-x-1'
                onClick={handleLangsMultySelectVisible}
              >
                <div>{selectedLangs.length} {t('selected')}</div>
                <ArrowDownIcon
                  className={`h-6 w-6 -mb-1 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
                />
              </div>

              {isLangsMultySelectVisible && (
                <MultySelect
                  onClose={onCloseLangsMultySelect}
                  onSave={onSaveSelectedLangs}
                  onSelectOption={onSelectLang}
                  selectTitle='langs'
                  options={user.languages.map(lang => lang.name)}
                  selectedOptions={langs.map(lang => lang.name)}
                />
              )}
            </div>

            <div className='flex items-center gap-x-4 mb-4'>
              <PencilIcon
                className={`h-6 w-6 fill-yellow-400`}
              />
              <div className='flex-1'>{t('interests')}</div>
              <div
                className='flex items-center gap-x-1'
                onClick={handleInterestsMultySelectVisible}
              >
                <div>{selectedInterests.length} {t('selected')}</div>
                <ArrowDownIcon
                  className={`h-6 w-6 -mb-1 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
                />
              </div>

              {isInterestsMultySelectVisible && (
                <MultySelect
                  onClose={onCloseInterests}
                  onSave={onSaveSelectedInterests}
                  onSelectOption={onSelectInterest}
                  selectTitle='interests'
                  options={user.interests}
                  selectedOptions={interests}
                />
              )}
            </div>

            <AgeRangeSelector />
          </div>
        </div>
      )}
    </div>
  )
}

export default ManuallySearch