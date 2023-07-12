import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Navbar from '../UI/Navbar'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { ReactComponent as SettingsIcon } from '../assets/settings.svg'
import { ReactComponent as GeoIcon } from '../assets/geo.svg'
import { ReactComponent as CakeIcon } from '../assets/cake.svg'
import { ReactComponent as MaleIcon } from '../assets/male.svg'
import { ReactComponent as FemaleIcon } from '../assets/female.svg'
import { ReactComponent as OtherGenderIcon } from '../assets/otherGender.svg'
import { ReactComponent as PencilIcon } from '../assets/navbarIcons/pencil.svg'
import { ReactComponent as ArrowDownIcon } from '../assets/arrowDown.svg'
import { ReactComponent as ClockIcon } from '../assets/clock.svg'
import { ReactComponent as CopyIcon } from '../assets/copy.svg'
import { ReactComponent as SuccessIcon } from '../assets/success.svg'
import { useTranslation } from 'react-i18next'
import { ageToString } from '../utils/calcAge'
import ZodiacIcon from '../components/ZodiacIcon'
import MyButton from '../UI/MyButton'
import UserAvatar from '../components/UserAvatar'
import { initialUserInfo, letterLengths, responseTimeArr } from '../utils/consts'
import { ILang, IUserInfo, LetterLengthType, ResponseTimeType, SexType, interest } from '../types/Auth/auth'
import MultySelect from '../UI/MultySelect'
import UserLangs from '../components/UserLangs'
import { useActions } from '../hooks/useActions'
import UserInfo from '../components/UserInfo'
import SignUpNavigation from '../UI/SignUpNavigation'
import Loader from '../UI/Loader'
import Select from '../UI/Select'
import WriteTextModal from '../UI/WriteTextModal'
import SelectGender from '../UI/SelectGender'
import AgeRangeModal from '../components/AgeRangeModal'

const Profile = () => {
  const { user } = useTypedSelector(state => state.auth)
  const { theme } = useTypedSelector(state => state.theme)
  const { interests } = useTypedSelector(state => state.data)
  const { t } = useTranslation()
  const { updateUserInterests, updateUserInfo, updateUserProfile } = useActions()
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState<IUserInfo>(user?.info || initialUserInfo)
  const [isEditUserInfoVisible, setIsEditUserInfoVisible] = useState(false)

  const [biography, setBiography] = useState(user?.profile.biography || '')
  const [isEditBiographyVisible, setIsEditBiographyVisible] = useState(false)

  const [letterLength, setLetterLength] = useState<LetterLengthType>(user?.profile.letterLength || 'any')
  const [isLetterSizeMenuVisible, setIsLetterSizeMenuVisible] = useState(false)

  const [responseTime, setResponseTime] = useState<ResponseTimeType>(user?.profile.responseTime || 'soonPossible')
  const [isResponseTimeMenuVisible, setIsResponseTimeMenuVisible] = useState(false)

  const [isCopyedId, setIsCopyedId] = useState(false)

  const [preferenceSex, setPreferenceSex] = useState<SexType[]>(user?.profile.sexPreference || [])

  const [userInterests, setUserInterests] = useState<interest[]>(user?.interests || [])
  const [isInterestsMenuVisible, setIsInterestMenuVisible] = useState(false)

  const [userLangs, setUserLangs] = useState<ILang[]>(user?.languages || [])

  const [isAgeRangeVisible, setIsAgeRangeVisible] = useState(false)
  const [leftValue, setLeftValue] = useState(user?.profile.ageRange[0] || 0);
  const [rightValue, setRightValue] = useState(user?.profile.ageRange[1] || 65);

  useEffect(() => {
    if (isEditUserInfoVisible || isAgeRangeVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isEditUserInfoVisible, isAgeRangeVisible])

  if (!user) {
    return <div className='flex justify-center py-20'><Loader size='16' /></div>
  }

  const handleEditUserInfoVisible = () => {
    setIsEditUserInfoVisible(prev => !prev)
  }

  const handleUpdateUserInfo = () => {
    updateUserInfo(user, userInfo)
    handleEditUserInfoVisible()
  }

  const handleSetUserInfo = (info: IUserInfo | null) => {
    if (info) {
      setUserInfo(info)
    }
  }

  const handleEditBiographyVisible = () => {
    setIsEditBiographyVisible(prev => !prev)
  }

  const handleEditBiography = (text: string) => {
    updateUserProfile(user, { ...user.profile, biography: text })
    setBiography(text)
    handleEditBiographyVisible()
  }

  const handleLetterLengthSelectVisible = () => {
    setIsLetterSizeMenuVisible(prev => !prev)
  }

  const onChangeSelectedLetterLength = (option: LetterLengthType) => {
    setLetterLength(option)
  }

  const onSaveSelectedLetterLength = () => {
    updateUserProfile(user, { ...user.profile, letterLength: letterLength })
    handleLetterLengthSelectVisible()
  }

  const onCloseLetterLengthSelect = () => {
    setLetterLength(user.profile.letterLength)
    handleLetterLengthSelectVisible()
  }

  const handleResponseTimeMenuVisible = () => {
    setIsResponseTimeMenuVisible(prev => !prev)
  }

  const onChangeSelectedResponseTime = (option: ResponseTimeType) => {
    setResponseTime(option)
  }

  const onSaveSelectedResponseTime = () => {
    updateUserProfile(user, { ...user.profile, responseTime: responseTime })
    handleResponseTimeMenuVisible()
  }

  const onCloseResponseTimeSelect = () => {
    setResponseTime(user.profile.responseTime || 'soonPossible')
    handleResponseTimeMenuVisible()
  }

  const onSavePreferenceSex = (editedPreferenceSex: SexType[]) => {
    updateUserProfile(user, { ...user.profile, sexPreference: editedPreferenceSex })
    setPreferenceSex(editedPreferenceSex)
  }

  const onCopyId = () => {
    navigator.clipboard.writeText(user.id || '').then(() => {
      setIsCopyedId(true)
      setTimeout(() => { setIsCopyedId(false) }, 1500);
    })
  }

  const handleInterestsMenuVisible = () => {
    setIsInterestMenuVisible(prev => !prev)
  }

  const handleInterests = (option: interest) => {
    if (userInterests.find(int => int === option)) {
      if (userInterests.length > 3) {
        setUserInterests(userInterests.filter(int => int !== option))
      }
    } else if (userInterests.length < 30) {
      setUserInterests([...userInterests, option])
    }
  }

  const onSaveUserInterests = (editedInterests: interest[]) => {
    updateUserInterests(user, userInterests)
    setUserInterests(editedInterests)
    handleInterestsMenuVisible()
  }

  const onCloseInterests = () => {
    setUserInterests(user.interests)
    handleInterestsMenuVisible()
  }

  const handleAgeRangeVisible = () => {
    setIsAgeRangeVisible(prev => !prev)
  }

  const onSaveAgeRange = (selectedLeftValue: number, selectedRightValue: number) => {
    handleAgeRangeVisible()
    setLeftValue(selectedLeftValue)
    setRightValue(selectedRightValue)
    updateUserProfile(user, { ...user.profile, ageRange: [selectedLeftValue, selectedRightValue] })
  }

  return (
    <div className={`${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-slate-200 text-zinc-900'} py-3`}>

      <div className={`fixed z-20 top-0 left-0 w-full grid grid-cols-3 items-center py-2 
        ${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-slate-200 text-zinc-900'}
      `}>
        <div></div>
        <div className='font-medium text-center text-xl'>{user && user.info.nickName}</div>
        <div className='flex justify-end pr-3'>
          <NavLink to='/profile/settings'>
            <SettingsIcon className={`h-5 w-5 ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`} />
          </NavLink>
        </div>
      </div>

      <div className='py-10'>
        <div className='px-2 relative mb-3'>
          <UserAvatar
            userAvatar={user.info.avatarUrl}
            theme={theme}
            canUpdate={false}
          />
        </div>

        <div className='flex items-center justify-between px-2 mb-2'>
          <div className='text-sm opacity-70'>{t('aboutMe')}</div>
          <div className={`flex gap-x-1 items-center`}>
            <GeoIcon className={`h-4 w-4 fill-yellow-400`} />
            <div>{user.geo.location.country}</div>
          </div>
        </div>

        <div className={`${theme === 'dark' ? 'bg-zinc-700' : 'bg-slate-300'} px-2 py-3 mb-3`}>
          <div
            onClick={handleEditUserInfoVisible}
            className='relative'
          >
            <div className='font-medium text-lg mb-2'>
              {user.info.nickName}
            </div>

            <div className='flex gap-x-2 gap-y-2 mb-4 text-sm flex-wrap pr-6'>
              <div className={`${theme === 'dark' ? 'bg-zinc-900' : 'bg-slate-400'} flex items-center gap-x-1 rounded-lg px-2 py-1`}>
                {user.info.sex === 'male'
                  ? <MaleIcon className={`h-5 w-5 ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`} />
                  : user.info.sex === 'female'
                    ? <FemaleIcon className={`h-5 w-5 ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`} />
                    : <OtherGenderIcon className={`h-5 w-5 ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`} />
                }
                <div>{t(user.info.sex)}</div>
              </div>

              <div className={`${theme === 'dark' ? 'bg-zinc-900' : 'bg-slate-400'} 
                flex items-center gap-x-1 rounded-lg px-2 py-1
              `}>
                <CakeIcon className={`h-4 w-4 ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`} />
                <div>{ageToString(user.info.birthDate)}</div>
              </div>

              <div className={`${theme === 'dark' ? 'bg-zinc-900' : 'bg-slate-400'} 
                flex items-center gap-x-1 rounded-lg px-2 py-1
              `}>
                <ZodiacIcon zodiac={user.info.zodiac} theme={theme} />
                <div>{t(user.info.zodiac)}</div>
              </div>

              <ArrowDownIcon
                className={`absolute right-0 top-1/2 -translate-y-1/2 h-6 w-6 -rotate-90
                  ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}
                `}
              />
            </div>
          </div>

          {!!biography.length && <div className='mb-2 truncate'>{biography}</div>}

          {isEditBiographyVisible && (
            <WriteTextModal
              defaultText={biography}
              onClose={handleEditBiographyVisible}
              onSave={handleEditBiography}
            />
          )}

          <div className='flex flex-col gap-y-2'>
            <MyButton
              color='black'
              onClick={handleEditBiographyVisible}
              title='writeBio'
            />
            <MyButton
              color='yellow'
              onClick={() => navigate('/users/' + user.id)}
              title='profilePreview'
            />
          </div>
        </div>

        {isEditUserInfoVisible && (
          <>
            <SignUpNavigation
              isStepsValid={[true]}
              onCloseClick={handleEditUserInfoVisible}
              onNextClick={handleUpdateUserInfo}
              onPrevClick={() => { }}
              step={1}
              buttonText='save'

            />
            <UserInfo
              userInfo={userInfo}
              setIsUserInfoValid={() => { }}
              setUserInfo={handleSetUserInfo}
            />
          </>
        )}

        <div className='text-sm opacity-70 px-2 mb-2'>{t('emailPreferences')}</div>

        <div className={`
          ${theme === 'dark' ? 'bg-zinc-700' : 'bg-slate-300'} 
            px-2 py-3 mb-3
          `}
        >
          <div className='flex justify-between items-center relative mb-2'>
            <div className='flex items-center gap-x-2'>
              <PencilIcon className={`h-4 w-5 ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`} />
              <div>{t('letterLength')}</div>
            </div>

            <div
              className='flex items-center gap-x-1'
              onClick={handleLetterLengthSelectVisible}
            >
              <div>{t(letterLength)}</div>
              <ArrowDownIcon className={`h-5 w-5 ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`} />
            </div>

            {isLetterSizeMenuVisible && (
              <Select
                options={letterLengths}
                title='letterLength'
                onSelectOption={onChangeSelectedLetterLength}
                selectedOption={letterLength}
                onClose={onCloseLetterLengthSelect}
                onSave={onSaveSelectedLetterLength}
              />
            )}

          </div>

          <div className='flex justify-between items-center relative'>
            <div className='flex items-center gap-x-2'>
              <ClockIcon className={`h-5 w-5 ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`} />
              <div>{t('responseTime')}</div>
            </div>

            <div
              className='flex items-center gap-x-1'
              onClick={handleResponseTimeMenuVisible}
            >
              <div>{t(responseTime)}</div>
              <ArrowDownIcon className={`h-5 w-5 ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`} />
            </div>

            {isResponseTimeMenuVisible && (
              <Select
                options={responseTimeArr}
                title='responseTime'
                onSelectOption={onChangeSelectedResponseTime}
                selectedOption={responseTime}
                onClose={onCloseResponseTimeSelect}
                onSave={onSaveSelectedResponseTime}
              />
            )}
          </div>
        </div>

        <div className='text-sm opacity-70 px-2 mb-2'>{t('preferences')}</div>

        <div className={`${theme === 'dark' ? 'bg-zinc-700' : 'bg-slate-300'} px-2 py-3 mb-3`}>
          <div className='flex items-center justify-between mb-2'>
            <div>Slowly ID</div>
            {isCopyedId
              ? <SuccessIcon className={`h-7 w-7 fill-green-500`} />
              : (
                <div
                  className='flex items-center justify-between gap-x-1'
                  onClick={onCopyId}
                >
                  <div className='-mb-2 font-medium text-lg'>******</div>
                  <CopyIcon className={`h-7 w-7 ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`} />
                </div>
              )
            }
          </div>

          <SelectGender
            userPreferenceSex={preferenceSex}
            onSave={onSavePreferenceSex}
          />

          <div className='flex items-center gap-x-4 mb-4'>
            <div className='flex-1'>{t('ageRange')}</div>
            <div
              className='flex items-center gap-x-1'
              onClick={handleAgeRangeVisible}
            >
              {!isAgeRangeVisible && <div>{leftValue} - {rightValue}</div>}
              <ArrowDownIcon className={`h-5 w-5 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`} />
            </div>
          </div>

          {isAgeRangeVisible && (
            <AgeRangeModal
              defaultLeftValue={leftValue}
              defaultRightValue={rightValue}
              onSaveAgeRange={onSaveAgeRange}
              onClose={handleAgeRangeVisible}
            />
          )}
        </div>

        <div className='text-sm opacity-70 px-2 mb-2'>{t('interests')}</div>

        <div className={`${theme === 'dark' ? 'bg-zinc-700' : 'bg-slate-300'} px-2 py-3 mb-3`}>
          {isInterestsMenuVisible && (
            <MultySelect
              onSelectOption={handleInterests}
              options={[...interests].sort((a, b) => a.localeCompare(b))}
              selectedOptions={userInterests}
              onClose={onCloseInterests}
              onSave={onSaveUserInterests}
              selectTitle='interests'
            />
          )}
          <div
            className='flex flex-wrap gap-x-2 gap-y-2'
            onClick={handleInterestsMenuVisible}
          >
            {[...userInterests].sort((a, b) => a.localeCompare(b)).slice(0, 2).map(int => (
              <div className='border border-yellow-400 rounded-xl px-4 py-1' key={int}>
                {t(int)}
              </div>
            ))}
            <div className='border border-yellow-400 rounded-xl px-8 text-xl pb-1' key={'...'}>...</div>
          </div>
        </div>

        <div className='text-sm opacity-70 px-2 mb-2'>{t('langs')}</div>

        <div className={`${theme === 'dark' ? 'bg-zinc-700' : 'bg-slate-300'} px-2 py-3`}>
          <UserLangs
            setUserLangs={setUserLangs}
            userLangs={userLangs.sort((a, b) => b.level - a.level)}
            user={user}
          />
        </div>

      </div>
      <Navbar />
    </div >
  )
}

export default Profile