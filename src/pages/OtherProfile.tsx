import React, { useEffect, useState } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useNavigate, useParams } from 'react-router-dom'
import UserAvatar from '../components/UserAvatar'
import supabase from '../supabaseClient'
import { IUser } from '../types/Auth/auth'
import { ReactComponent as ArrowBackIcon } from '../assets/arrowBack.svg'
import { ReactComponent as ClockIcon } from '../assets/clock.svg'
import { ReactComponent as PencilIcon } from '../assets/navbarIcons/pencil.svg'
import { useTranslation } from 'react-i18next'
import MyButton from '../UI/MyButton'
import { ReactComponent as CakeIcon } from '../assets/cake.svg'
import { ageToString } from '../utils/calcAge'
import ZodiacIcon from '../components/ZodiacIcon'
import { ReactComponent as MaleIcon } from '../assets/male.svg'
import { ReactComponent as FemaleIcon } from '../assets/female.svg'
import { ReactComponent as OtherGenderIcon } from '../assets/otherGender.svg'
import { ReactComponent as GeoIcon } from '../assets/geo.svg'
import { ReactComponent as PlaneIcon } from '../assets/plane.svg'
import { ReactComponent as ArrowsLeftRightIcon } from '../assets/arrowsLeftRight.svg'
import { filterInterests } from '../utils/filterInterests'
import WriteLetter from '../components/WriteLetter'
import WriteLetterButton from '../UI/WriteLetterButton'
import { useDeliveryTime } from '../hooks/useDeliveryTime'
import { fetchUserById } from '../utils/fetchUserById'
import Loader from '../UI/Loader'

const OtherProfile = () => {
  const { theme } = useTypedSelector(state => state.theme)
  const { user } = useTypedSelector(state => state.auth)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()
  const [otherUser, setOtherUser] = useState<IUser | null>(null)
  const [isWriteLetterVisible, setWriteLetterVisible] = useState(false)

  const [isBiographyTruncated, setIsBiographyTruncated] = useState(true)
  const { differenceDistance, deliveredTime } = useDeliveryTime(user, otherUser)

  const [commonInterests, differentInterests] = filterInterests(otherUser?.interests || [], user?.interests || [])

  useEffect(() => {
    if (id) {
      fetchUserById(id, setOtherUser, () => { })
    }
  }, [id])

  const handleOpenBiography = () => {
    setIsBiographyTruncated(false)
  }

  const onGoBackClick = () => {
    navigate(-1)
  }

  const handleIsWriteLetterVisible = () => {
    setWriteLetterVisible(prev => !prev)
  }

  if (!otherUser || !user) {
    return <div className='flex justify-center py-20'><Loader size='16' /></div>
  }
  return (
    <div className={`pb-10 ${theme === 'dark' ? 'bg-zinc-700 text-white' : 'bg-slate-200 text-zinc-900'}`}>
      <div className={`${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-slate-300 text-zinc-900'} pt-12 pb-3`}>
        <div className={`flex items-center gap-x-5 fixed z-10 top-0 py-2 px-3 w-full 
          ${theme === 'dark' ? 'bg-zinc-800' : 'bg-slate-300 '}
        `}>
          <ArrowBackIcon
            className={`h-7 w-7 ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`}
            onClick={onGoBackClick}
          />
          <div>{otherUser.info.nickName}</div>
        </div>
        <div className='relative'>
          <UserAvatar
            userAvatar={otherUser.info.avatarUrl}
            theme={theme}
            canUpdate={false}
          />
        </div>
      </div>

      <div className='px-3 mb-6'>
        <div className={`pt-3 text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          {t('about')} {otherUser.info.nickName}
        </div>

        <div className='mb-6'>
          {isBiographyTruncated
            ? otherUser.profile.biography.length > 100
              ? <div className='mb-2'>{otherUser.profile.biography.slice(0, 100)}...</div>
              : <div className='mb-2'>{otherUser.profile.biography}</div>
            : <div className='mb-2'>{otherUser.profile.biography}</div>
          }
          {isBiographyTruncated && otherUser.profile.biography.length >= 100 && (
            <MyButton
              color='black'
              onClick={handleOpenBiography}
              title='more'
            />
          )}
        </div>

        <div className='flex flex-col gap-y-2'>
          <div className='flex gap-x-2 items-center'>
            <CakeIcon className={`h-5 w-5 fill-yellow-400`} />
            <div className='text-sm'>{ageToString(otherUser.info.birthDate)}</div>
            <div className='flex gap-x-1 items-center'>
              <ZodiacIcon zodiac={otherUser.info.zodiac} theme={theme} />
              <div>{t(otherUser.info.zodiac.toLowerCase())}</div>
            </div>
          </div>

          <div className='flex items-center gap-x-2'>
            {otherUser.info.sex === 'male'
              ? <MaleIcon className={`h-5 w-5 fill-yellow-400`} />
              : otherUser.info.sex === 'female'
                ? <FemaleIcon className={`h-5 w-5 fill-yellow-400`} />
                : <OtherGenderIcon className={`h-5 w-5 fill-yellow-400`} />
            }
            <div>{t('sex')}: {t(otherUser.info.sex)}</div>
          </div>

          <div className='flex items-center gap-x-2'>
            <GeoIcon className={`h-5 w-5 fill-yellow-400`} />
            <div>{otherUser.geo.location.country}</div>
          </div>

          <div className='flex items-center gap-x-2'>
            <ArrowsLeftRightIcon className={`h-5 w-5 fill-yellow-400`} />
            <div>≈ {Math.round(differenceDistance / 100) * 100} {t('kmFromYou')} </div>
          </div>

          <div className='flex items-center gap-x-2'>
            <PlaneIcon className={`h-5 w-5 fill-yellow-400`} />
            <div>{t('letterDelivered')} {deliveredTime < 60 ? `${deliveredTime} ${t('minutes')}` : `${Math.round(deliveredTime / 60)} ${t('hours')}`}
            </div>
          </div>
        </div>
      </div>

      <div className='px-3 mb-6'>
        <div className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{t('interests')}</div>
        <div className='flex flex-wrap items-center gap-x-2 gap-y-1 text-sm mb-3'>
          {commonInterests.map(int => (
            <div key={int} className='bg-yellow-400 text-zinc-900 font-medium rounded-2xl px-3 py-1'>{t(int)}</div>
          ))}
          {differentInterests.map(int => (
            <div key={int} className='font-medium rounded-2xl px-3 py-1 border-yellow-400 border-2'>{t(int)}</div>
          ))}
        </div>

        <div className='flex items-center gap-x-2 text-sm'>
          <div className='flex items-center gap-x-1'>
            <div className='bg-yellow-400 w-4 h-4 rounded-sm'></div>
            <div>{t('common')}</div>
          </div>
          <div className='flex items-center gap-x-1'>
            <div className='border-2 border-yellow-400 w-4 h-4 rounded-sm'></div>
            <div>{t('different')}</div>
          </div>
        </div>
      </div>

      <div className='px-3 mb-6'>
        <div className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{t('langs')}</div>
        <div className='grid grid-cols-2 gap-y-4'>
          {otherUser.languages.sort((a, b) => b.level - a.level).map(lang => (
            <div key={lang.code} className='flex flex-col'>
              <div className='mb-1'>
                <div className={`font-medium ${theme === 'dark' ? 'text-yellow-400' : 'text-black'} leading-none`}>{lang.name}</div>
                <div className={`text-sm  ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{lang.engName}</div>
              </div >
              <div className='flex gap-x-1'>
                {[1, 2, 3, 4, 5].map(ind => (
                  <div
                    key={ind}
                    className={`${lang.level >= ind
                      ? 'border-yellow-400 bg-yellow-400'
                      : theme === 'dark'
                        ? 'border-white bg-transparent'
                        : 'border-gray-400'
                      } 
                        rounded-full border-2 h-3 w-3`
                    }
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className='px-3 pb-6'>
        <div className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : ''}`}>{t('emailPreferences')}</div>
        <div className='flex items-center gap-x-2 mb-1'>
          <PencilIcon className={`h-4 w-5 fill-yellow-400`} />
          <div>{t('letterLength')}: {t(otherUser.profile.letterLength)}</div>
        </div>
        <div className='flex items-center gap-x-2'>
          <ClockIcon className={`h-5 w-5 fill-yellow-400`} />
          <div>{t('responseTime')}: {t(otherUser.profile.responseTime)}</div>
        </div>
      </div>

      {user.id !== otherUser.id && <WriteLetterButton onWriteLetterClick={handleIsWriteLetterVisible} />}

      {isWriteLetterVisible && (
        <WriteLetter
          deliveredTime={deliveredTime}
          otherUser={otherUser}
          onClose={handleIsWriteLetterVisible}
        />
      )}
    </div>
  )
}

export default OtherProfile