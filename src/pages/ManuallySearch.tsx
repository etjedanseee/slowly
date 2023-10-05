import React, { useState, useEffect } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ReactComponent as ArrowBackIcon } from '../assets/arrowBack.svg'
import { ReactComponent as ArrowDownIcon } from '../assets/arrowDown.svg'
import { ReactComponent as CloseIcon } from '../assets/close.svg'
import { ReactComponent as MenuIcon } from '../assets/menu.svg'
import { ReactComponent as LanguageIcon } from '../assets/language.svg'
import { ReactComponent as ChattingIcon } from '../assets/chatting.svg'
import { ReactComponent as CakeIcon } from '../assets/cake.svg'
import { ReactComponent as PencilIcon } from '../assets/navbarIcons/pencil.svg'
import { ReactComponent as SexIcon } from '../assets/sex.svg'
import { ReactComponent as StarIcon } from '../assets/star.svg'
import CompactUserProfile from '../components/CompactUserProfile'
import { ILang, IUser, SexType, ZodiacType, interest } from '../types/Auth/auth'
import MyButton from '../UI/MyButton'
import MultySelect from '../UI/MultySelect'
import Loader from '../UI/Loader'
import AgeRangeSelector from '../UI/AgeRangeSelector'
import { ageOptionsLeft, ageOptionsRight, zodiacs } from '../utils/consts'
import SelectGender from '../UI/SelectGender'
import { getFilteredPenpals, getFilteredPenpalsProps } from '../utils/getFilteredPenpals'

const ManuallySearch = () => {
  const { theme } = useTypedSelector(state => state.theme)
  const { user, chatList } = useTypedSelector(state => state.auth)
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

  const [isAgeRangeVisible, setIsAgeRangeVisible] = useState(false)
  const [leftAge, setLeftAge] = useState(ageOptionsLeft[0]);
  const [rightAge, setRightAge] = useState(ageOptionsRight[ageOptionsRight.length - 1]);

  const [preferenceSex, setPreferenceSex] = useState<SexType[]>(user?.profile.sexPreference || [])

  const [isZodiacMultySelectVisible, setIsZodiacMultySelectVisible] = useState(false)
  const [zodiac, setZodiac] = useState<ZodiacType[]>(zodiacs)
  const [selectedZodiac, setSelectedZodiac] = useState<ZodiacType[]>(zodiacs)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user && !!chatList.length && !findedUsers.length) {
      const manuallySearchFilters = localStorage.getItem('manuallySearchFilters')

      if (manuallySearchFilters) {
        const data = JSON.parse(manuallySearchFilters)
        setIsIncludeUsersWithBiography(data.isIncludeUsersWithBiography)
        setSelectedInterests(data.selectedInterests)
        setInterests(data.selectedInterests)
        setSelectedLangs(data.selectedLangs)
        setLangs(data.selectedLangs)
        setSelectedZodiac(data.selectedZodiac)
        setZodiac(data.selectedZodiac)
        setPreferenceSex(data.preferenceSex)
        setLeftAge(data.leftAge)
        setRightAge(data.rightAge)

        getFilteredPenpals({
          includesBiography: data.isIncludeUsersWithBiography,
          ageRange: [data.leftAge, data.rightAge],
          interests: data.selectedInterests,
          langs: data.selectedLangs,
          zodiac: data.selectedZodiac,
          sex: data.preferenceSex,
          // excludeIds: [user.id, ...chatList.map(chat => chat.chatId)],
          excludeIds: [],
          setFindedUsers,
          setLoading, t
        })
      } else {
        getFilteredPenpals({
          includesBiography: isIncludeUsersWithBiography,
          ageRange: [leftAge, rightAge],
          interests: selectedInterests,
          langs: selectedLangs,
          zodiac: selectedZodiac,
          sex: preferenceSex,
          // excludeIds: [user.id, ...chatList.map(chat => chat.chatId)],
          excludeIds: [],
          setFindedUsers,
          setLoading, t
        })
      }
    }
  }, [user, chatList])

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
  const handleAgeRangeVisible = () => {
    setIsAgeRangeVisible(prev => !prev)
  }

  const onSavePreferenceSex = (editedPreferenceSex: SexType[]) => {
    setPreferenceSex(editedPreferenceSex)
  }

  const handleZodiacMultySelectVisible = () => {
    setIsZodiacMultySelectVisible(prev => !prev)
  }

  const onSelectZodiac = (zod: ZodiacType) => {
    if (zodiac.includes(zod)) {
      if (zodiac.length > 1) {
        setZodiac(zodiac.filter(z => z !== zod))
      }
    } else {
      setZodiac([...zodiac, zod])
    }
  }

  const onCloseZodiacMultySelect = () => {
    setZodiac(selectedZodiac)
    handleZodiacMultySelectVisible()
  }

  const onSaveSelectedZodiac = () => {
    setSelectedZodiac(zodiac)
    handleZodiacMultySelectVisible()
  }

  const onSaveFilters = async () => {
    const filters = { isIncludeUsersWithBiography, leftAge, rightAge, selectedInterests, selectedLangs, selectedZodiac, preferenceSex }
    localStorage.setItem('manuallySearchFilters', JSON.stringify(filters))

    handleFilterModalVisible()
    const props: getFilteredPenpalsProps = {
      includesBiography: isIncludeUsersWithBiography,
      ageRange: [leftAge, rightAge],
      interests: selectedInterests,
      langs: selectedLangs,
      zodiac: selectedZodiac,
      sex: preferenceSex,
      // excludeIds: [user.id, ...chatList.map(chat => chat.chatId)],
      excludeIds: [],
      setFindedUsers,
      setLoading, t
    }
    await getFilteredPenpals(props)
  }

  return (
    <div className={`px-3 py-16 w-full h-full ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-200'}`}>
      <div className={`fixed top-0 left-0 nMb:left-1/2 nMb:-translate-x-1/2 nMb:max-w-[425px] 
          z-10 w-full flex items-center bg-inherit justify-between gap-x-6 py-3 px-3
        `}>
        <ArrowBackIcon
          className={`h-7 w-7 cursor-pointer ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
          onClick={onGoBackClick}
        />
        <div className='flex-1'>{t('coincidences')}</div>
        <MenuIcon
          onClick={handleFilterModalVisible}
          className={`h-7 w-7 cursor-pointer ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
        />
        <div className={`${theme === 'dark' ? 'bg-black' : 'bg-gray-500'} h-[1px] w-full absolute top-full left-0`} />
      </div>

      {loading
        ? <div className='flex justify-center py-20'><Loader size='16' /></div>
        : !findedUsers.length
          ? <div className='mb-2'>No match users</div>
          : (
            <div className='grid grid-cols-2 gap-2'>
              {findedUsers.map(user => (
                <CompactUserProfile userProfile={user} key={user.id} />)
              )}
            </div>
          )
      }

      {isFilterModalVisible && (
        <div className={`fixed top-0 left-0 h-full nMb:left-1/2 nMb:-translate-x-1/2 nMb:max-w-[425px] z-20 w-full 
          ${theme === 'dark' ? 'bg-zinc-800' : 'bg-slate-200'}
        `}>
          <div className={`absolute top-0 z-20 w-full flex items-center justify-between flex-wrap gap-y-3 py-3 px-2 
            ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-200'}`}>
            <CloseIcon
              className={`h-6 w-6 cursor-pointer ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
              onClick={handleFilterModalVisible}
            />
            <div>
              <MyButton
                color='yellow'
                onClick={onSaveFilters}
                title='save'
                variant='rounded-full'
              />
            </div>
            <div className='w-full text-3xl uppercase font-medium tracking-wide'>{t('filters')}</div>
          </div>

          <div className='pt-32'>
            <div className='flex items-center gap-x-4 mb-4 px-2'>
              <ChattingIcon
                className={`h-6 w-6 fill-yellow-400`}
              />
              <div className='flex-1'>{t('withBiography')}</div>
              <div
                className={`border-yellow-400 border-2 cursor-pointer h-5 w-5 flex items-center justify-center`}
                onClick={onChangeIncludeUsersWithBio}
              >
                <div className={`${isIncludeUsersWithBiography ? 'bg-yellow-400' : 'bg-transparent'} h-3 w-3`} />
              </div>
            </div>

            <div className='flex items-center gap-x-4 mb-4 px-2'>
              <LanguageIcon
                className={`h-6 w-6 fill-yellow-400`}
              />
              <div className='flex-1'>{t('langs')}</div>
              <div
                className='flex items-center gap-x-1 cursor-pointer'
                onClick={handleLangsMultySelectVisible}
              >
                <div>{selectedLangs.length} {t('selected')}</div>
                <ArrowDownIcon
                  className={`h-5 w-5 -mb-1 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
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

            <div className='flex items-center gap-x-4 mb-4 px-2'>
              <PencilIcon
                className={`h-6 w-6 fill-yellow-400`}
              />
              <div className='flex-1'>{t('interests')}</div>
              <div
                className='flex items-center gap-x-1 cursor-pointer'
                onClick={handleInterestsMultySelectVisible}
              >
                <div>{selectedInterests.length} {t('selected')}</div>
                <ArrowDownIcon
                  className={`h-5 w-5 -mb-1 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
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

            <div className='flex items-center gap-x-4 mb-4'>
              <div className='pl-2'>
                <CakeIcon
                  className={`h-6 w-6 fill-yellow-400`}
                />
              </div>
              <div className='flex-1'>{t('ageRange')}</div>
              <div
                className='flex items-center gap-x-1 cursor-pointer'
                onClick={handleAgeRangeVisible}
              >
                {!isAgeRangeVisible && <div>{leftAge} - {rightAge}</div>}
                <div className='pr-2'>
                  <ArrowDownIcon
                    className={`h-5 w-5 duration-300 
                    ${isAgeRangeVisible ? 'rotate-180' : 'rotate-0'} 
                    ${theme === 'dark' ? 'fill-white' : 'fill-black'}
                  `}
                  />
                </div>
              </div>
            </div>

            {isAgeRangeVisible && (
              <div className='my-2'>
                <AgeRangeSelector
                  leftValue={leftAge}
                  rightValue={rightAge}
                  setLeftValue={setLeftAge}
                  setRightValue={setRightAge}
                />
              </div>
            )}

            <div className='pr-2 pl-12 relative'>
              <SexIcon
                className={`h-6 w-6 fill-yellow-400 absolute left-2 top-1/2 -translate-y-1/2`}
              />
              <SelectGender
                userPreferenceSex={preferenceSex}
                onSave={onSavePreferenceSex}
              />
            </div>

            <div className='flex items-center gap-x-4 mb-4 px-2'>
              <StarIcon
                className={`h-6 w-6 fill-yellow-400`}
              />
              <div className='flex-1'>{t('zodiac')}</div>
              <div
                className='flex items-center gap-x-1 cursor-pointer'
                onClick={handleZodiacMultySelectVisible}
              >
                <div>{zodiac.length} {t('selected')}</div>
                <ArrowDownIcon
                  className={`h-5 w-5 -mb-1 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
                />
              </div>

              {isZodiacMultySelectVisible && (
                <MultySelect
                  onClose={onCloseZodiacMultySelect}
                  onSave={onSaveSelectedZodiac}
                  onSelectOption={onSelectZodiac}
                  selectTitle='zodiac'
                  options={zodiacs}
                  selectedOptions={zodiac}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManuallySearch