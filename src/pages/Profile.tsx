import React, { ChangeEvent, MouseEvent, useState } from 'react'
import { NavLink } from 'react-router-dom'
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
import { useTranslation } from 'react-i18next'
import { ageToString } from '../utils/calcAge'
import ZodiacIcon from '../components/ZodiacIcon'
import MyButton from '../UI/MyButton'
import SelectMenu from '../UI/SelectMenu'

const Profile = () => {
  const { user } = useTypedSelector(state => state.auth)
  const { theme } = useTypedSelector(state => state.theme)
  const { t } = useTranslation()
  const [isLetterSizeMenuVisible, setIsLetterSizeMenuVisible] = useState(false)
  //взять из юзера
  const [selectedLetterLength, setSelectedLetterLength] = useState('any')

  const [isResponseTimeMenuVisible, setIsResponseTimeMenuVisible] = useState(false)
  //взять из юзера
  const [responseTime, setResponseTime] = useState('soonPossible')

  const letterLengths = ['any', 'short', 'shortMedium', 'medium', 'mediumLong', 'long']
  const responseTimeArr = ['soonPossible', 'withinWeek', 'within2Week', 'within3Week', 'withinMonth', 'overMonth']

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const hangleLetterSizeMenuVisible = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setIsLetterSizeMenuVisible(prev => !prev)
  }

  const changeSelectedLetterLength = (e: MouseEvent<HTMLDivElement>, option: string) => {
    setSelectedLetterLength(option)
    hangleLetterSizeMenuVisible(e)
  }

  const hangleResponseTimeMenuVisible = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setIsResponseTimeMenuVisible(prev => !prev)
  }

  const changeSelectedResponseTime = (e: MouseEvent<HTMLDivElement>, option: string) => {
    setResponseTime(option)
    hangleResponseTimeMenuVisible(e)
  }

  return (
    <div className={`
      ${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-slate-200 text-zinc-900'} 
      py-3`
    }>
      <NavLink to='/profile/settings'>
        <div className={`fixed top-0 left-0 w-full grid grid-cols-3 items-center py-2 ${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-slate-200 text-zinc-900'}`}>
          <div></div>
          <div className='text-center text-xl'>{user && user.info.nickName}</div>
          <div className='flex justify-end pr-3'>
            <SettingsIcon className={`h-5 w-5 ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`} />
          </div>

        </div>
      </NavLink>

      {user && (
        <>

          <div className='flex gap-x-1 items-center py-10 px-2'>
            <GeoIcon className={`h-4 w-4 fill-yellow-400`} />
            <div>{user.geo.location.country}</div>
          </div>

          <div className='text-sm opacity-70 px-2 mb-2'>{t('aboutMe')}</div>

          <div className={`
            ${theme === 'dark' ? 'bg-zinc-700' : 'bg-slate-300'} 
            px-2 py-3 mb-4
          `}>
            <div className='flex flex-col items-center'>
              <input type="file" onChange={handleFileChange} />
              {previewUrl && <img src={previewUrl} alt="Preview" className='rounded-full h-32 w-32' />}
            </div>
            <div className='font-medium text-lg mb-1'>{user.info.nickName}</div>

            <div className='flex gap-x-2 mb-2 text-sm'>
              <div className={`${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-300'} 
                flex items-center gap-x-1 rounded-lg px-2 py-1
              `}>
                {user.info.sex === 'male'
                  ? <MaleIcon className={`h-5 w-5 ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`} />
                  : user.info.sex === 'female' ? <FemaleIcon className={`h-5 w-5 ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`} />
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
                {/* <ZodiacIcon zodiac={user.info.zodiac} theme={theme} /> */}
                <ZodiacIcon zodiac={'Virgo'} theme={theme} />
                <div>{t(user.info.zodiac)}</div>
              </div>
            </div>

            <div className='h-[1px] w-full bg-black mb-4'></div>

            <div className='flex flex-col gap-y-2'>
              <MyButton
                color='black'
                onClick={() => { }}
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
              px-2 py-3
            `}
          >
            <div className='flex justify-between items-center relative mb-2'>
              <div className='flex items-center gap-x-2'>
                <PencilIcon className={`h-4 w-5 ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`} />
                <div>{t('letterLength')}</div>
              </div>

              <div
                className='flex items-center gap-x-1'
                onClick={hangleLetterSizeMenuVisible}
              >
                <div>{t(selectedLetterLength)}</div>
                <ArrowDownIcon className={`h-5 w-5 ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`} />

                <SelectMenu arr={letterLengths} onSelectOption={changeSelectedLetterLength} isMenuVisible={isLetterSizeMenuVisible} />
              </div>
            </div>

            <div className='flex justify-between items-center relative'>
              <div className='flex items-center gap-x-2'>
                <ClockIcon className={`h-5 w-5 ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`} />
                <div>{t('responseTime')}</div>
              </div>

              <div
                className='flex items-center gap-x-1'
                onClick={hangleResponseTimeMenuVisible}
              >
                <div>{t(responseTime)}</div>
                <ArrowDownIcon className={`h-5 w-5 ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`} />

                <SelectMenu arr={responseTimeArr} isMenuVisible={isResponseTimeMenuVisible} onSelectOption={changeSelectedResponseTime} />
              </div>
            </div>
          </div>
        </>
      )}

      <Navbar />
    </div>
  )
}

export default Profile