import React, { MouseEvent, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
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
import { ReactComponent as CheckmarkIcon } from '../assets/checkmark.svg'
import { useTranslation } from 'react-i18next'
import { ageToString } from '../utils/calcAge'
import ZodiacIcon from '../components/ZodiacIcon'
import MyButton from '../UI/MyButton'
import SelectMenu from '../UI/SelectMenu'
import UserAvatar from '../components/UserAvatar'
import { letterLengths, responseTimeArr, sexArr } from '../utils/consts'
import { ILang, LetterLengthType, ResponseTimeType, SexType, interest } from '../types/Auth/auth'
import MultySelect from '../UI/MultySelect'
import UserLangs from '../components/UserLangs'
import { useActions } from '../hooks/useActions'
import Biography from '../components/Biography'

const Profile = () => {
  const { user } = useTypedSelector(state => state.auth)
  const { theme } = useTypedSelector(state => state.theme)
  const { interests } = useTypedSelector(state => state.data)
  const { t } = useTranslation()
  const { updateUserInterests, updateUserSexPreference, updateUserResponseTime, updateUserLetterLength, updateUserBiography } = useActions()

  const [biography, setBiography] = useState(user?.profile.biography || '')
  const [isEditBiographyVisible, setIsEditBiographyVisible] = useState(false)

  const [selectedLetterLength, setSelectedLetterLength] = useState<LetterLengthType>(user?.profile.letterLength || 'any')
  const [isLetterSizeMenuVisible, setIsLetterSizeMenuVisible] = useState(false)

  const [responseTime, setResponseTime] = useState<ResponseTimeType>(user?.profile.responseTime || 'soonPossible')
  const [isResponseTimeMenuVisible, setIsResponseTimeMenuVisible] = useState(false)

  const [isEditAvatarVisible, setIsEditAvatarVisible] = useState(false)
  const [isCopyedId, setIsCopyedId] = useState(false)

  const [preferenceSex, setPreferenceSex] = useState<SexType[]>(user?.profile.sexPreference || [])
  const [isPrefSexMenuVisible, setIsPrefSexMenuVisible] = useState(false)

  const [userInterests, setUserInterests] = useState<interest[]>(user?.interests || [])
  const [isInterestsMenuVisible, setIsInterestMenuVisible] = useState(false)

  const [userLangs, setUserLangs] = useState<ILang[]>(user?.languages || [])

  if (!user) {
    return null
  }

  const handleEditBiographyVisible = () => {
    setIsEditBiographyVisible(prev => !prev)
  }

  const handleEditBiography = (text: string) => {
    updateUserBiography(user, text)
    setBiography(text)
    handleEditBiographyVisible()
  }

  const hangleLetterLengthMenuVisible = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setIsLetterSizeMenuVisible(prev => !prev)
  }

  const changeSelectedLetterLength = (e: MouseEvent<HTMLDivElement>, option: LetterLengthType) => {
    setSelectedLetterLength(option)
    updateUserLetterLength(user, option)
    hangleLetterLengthMenuVisible(e)
  }

  const handleResponseTimeMenuVisible = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setIsResponseTimeMenuVisible(prev => !prev)
  }

  const changeSelectedResponseTime = (e: MouseEvent<HTMLDivElement>, option: ResponseTimeType) => {
    setResponseTime(option)
    updateUserResponseTime(user, option)
    handleResponseTimeMenuVisible(e)
  }

  const handleEditAvatarVisible = () => {
    setIsEditAvatarVisible(prev => !prev)
  }

  const handlePrefSexMenuVisible = () => {
    if (isPrefSexMenuVisible) {
      updateUserSexPreference(user, preferenceSex)
    }
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

  const onCopyId = () => {
    navigator.clipboard.writeText(user?.id || '')
      .then(() => {
        setIsCopyedId(true)
        setTimeout(() => {
          setIsCopyedId(false)
        }, 1500);
      })
      .catch(err => {
        console.log('Something went wrong', err);
      });
  }

  const handleInterestsMenuVisible = () => {
    if (isInterestsMenuVisible) {
      updateUserInterests(user, userInterests)
    }
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

  return (
    <div className={`${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-slate-200 text-zinc-900'} py-3`}>
      <NavLink to='/profile/settings'>
        <div className={`fixed z-50 top-0 left-0 w-full grid grid-cols-3 items-center py-2 ${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-slate-200 text-zinc-900'}`}>
          <div></div>
          <div className='font-medium text-center text-xl'>{user && user.info.nickName}</div>
          <div className='flex justify-end pr-3'>
            <SettingsIcon className={`h-5 w-5 ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`} />
          </div>
        </div>
      </NavLink>

      <div className='py-10'>
        <div className='px-2 relative mb-6'>
          <UserAvatar
            userAvatar={user.info.avatarUrl}
            theme={theme}
            canUpdate={isEditAvatarVisible}
          />
          <div
            className={`absolute ${isEditAvatarVisible ? 'bottom-1/2 ' : 'bottom-0 '} right-2 bottom-0 px-8 rounded-xl border`}
            onClick={handleEditAvatarVisible}
          >
            <PencilIcon className={`absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 
              ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`}
            />
            <div className='text-sm'>Edit</div>
          </div>

          <div className={`absolute ${isEditAvatarVisible ? 'bottom-1/2' : 'bottom-0'} left-0 flex gap-x-1 items-center px-2`}>
            <GeoIcon className={`h-4 w-4 fill-yellow-400`} />
            <div>{user.geo.location.country}</div>
          </div>
        </div>

        <div className='text-sm opacity-70 px-2 mb-2'>{t('aboutMe')}</div>

        <div className={`${theme === 'dark' ? 'bg-zinc-700' : 'bg-slate-300'} px-2 py-3 mb-3`}>
          <div className='font-medium text-lg mb-1'>{user.info.nickName}</div>

          <div className='flex gap-x-2 mb-3 text-sm'>
            <div className={`${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-300'} flex items-center gap-x-1 rounded-lg px-2 py-1`}>
              {user.info.sex === 'male'
                ? <MaleIcon className={`h-5 w-5 ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`} />
                : user.info.sex === 'female'
                  ? <FemaleIcon className={`h-5 w-5 ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`} />
                  : <OtherGenderIcon className={`h-5 w-5 ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`} />
              }
              <div>{t(user.info.sex)}</div>
            </div>

            <div className={`${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-300'} 
                flex items-center gap-x-1 rounded-lg px-2 py-1
              `}>
              <CakeIcon className={`h-4 w-4 ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`} />
              <div className='text-sm'>{ageToString(user.info.birthDate)}</div>
            </div>

            <div className={`${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-300'} 
                flex items-center gap-x-1 rounded-lg px-2 py-1
              `}>
              <ZodiacIcon zodiac={user.info.zodiac} theme={theme} />
              <div>{t(user.info.zodiac)}</div>
            </div>
          </div>

          {!!biography.length && (
            <div className='pb-2 truncate'>
              {biography}
            </div>
          )}

          <Biography
            isBiographyVisible={isEditBiographyVisible}
            onClose={handleEditBiographyVisible}
            onSave={handleEditBiography}
            userBiography={biography}
          />

          <div className='flex flex-col gap-y-2'>
            <MyButton
              color='black'
              onClick={handleEditBiographyVisible}
              title='writeBio'
              variant='roundedXl'
              p='py-1'
            />
            <MyButton
              color='yellow'
              onClick={() => { }}
              title='profilePreview'
              variant='roundedXl'
              p='py-1'
            />
          </div>
        </div>

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
              onClick={hangleLetterLengthMenuVisible}
            >
              <div>{t(selectedLetterLength)}</div>
              <ArrowDownIcon className={`h-5 w-5 ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`} />

              <SelectMenu
                options={letterLengths}
                onSelectOption={changeSelectedLetterLength}
                isMenuVisible={isLetterSizeMenuVisible}
              />
            </div>
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

              <SelectMenu
                options={responseTimeArr}
                isMenuVisible={isResponseTimeMenuVisible}
                onSelectOption={changeSelectedResponseTime}
              />
            </div>
          </div>
        </div>

        <div className='text-sm opacity-70 px-2 mb-2'>{t('preferences')}</div>

        <div className={`${theme === 'dark' ? 'bg-zinc-700' : 'bg-slate-300'} px-2 py-3 mb-3`}>
          <div className='flex items-center justify-between mb-2'>
            <div>Slowly ID</div>
            {isCopyedId
              ? <CheckmarkIcon className={`h-7 w-7 fill-green-500`} />
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

          <div className='flex justify-between items-center relative'>
            <div>{t('selectGender')}</div>

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

        <div className='text-sm opacity-70 px-2 mb-2'>{t('interests')}</div>

        <div className={`${theme === 'dark' ? 'bg-zinc-700' : 'bg-slate-300'} px-2 py-3 mb-3`}>
          <MultySelect
            isMenuVisible={isInterestsMenuVisible}
            onSelectOption={handleInterests}
            options={[...interests].sort((a, b) => a.localeCompare(b))}
            selectedOptions={userInterests}
            onClose={handleInterestsMenuVisible}
            selectTitle='interests'
          />
          <div
            className='flex flex-wrap gap-x-2 gap-y-2'
            onClick={handleInterestsMenuVisible}
          >
            {[...interests].slice(0, 3).map(int => (
              <div className='border border-yellow-400 rounded-xl px-4 py-1' key={int}>
                {t(int)}
              </div>
            ))}
            <div className='border border-yellow-400 rounded-xl px-8 text-xl pb-1' key={'...'}>...</div>
          </div>
        </div>

        <div className='text-sm opacity-70 px-2 mb-2'>{t('langs')}</div>

        <div className={`${theme === 'dark' ? 'bg-zinc-700' : 'bg-slate-300'} px-2 py-3 mb-32`}>
          <UserLangs
            setUserLangs={setUserLangs}
            userLangs={userLangs}
            user={user}
          />
        </div>

      </div>
      <Navbar />
    </div>
  )
}

export default Profile