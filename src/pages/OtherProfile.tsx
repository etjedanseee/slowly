import React, { useEffect, useState } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useNavigate, useParams } from 'react-router-dom'
import UserAvatar from '../components/UserAvatar'
import supabase from '../supabaseClient'
import { IUser } from '../types/Auth/auth'
import { ReactComponent as ArrowBackIcon } from '../assets/arrowBack.svg'
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
import { coordsToDistance } from '../utils/calcDistance'

//придумать как засунуть в состояние обьект пользователя
const OtherProfile = () => {
  const { theme } = useTypedSelector(state => state.theme)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams()
  const [otherUser, setOtherUser] = useState<IUser | null>(null)

  const [isBiographyTruncated, setIsBiographyTruncated] = useState(true)
  const [differenceDistance, setDifferenceDistance] = useState(0)

  //90 km - 1 min
  const deliveredTime = Math.round(differenceDistance / 90)

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.from('Users').select('*').eq('id', id);

      console.log('other user fetch', data);

      if (error) {
        console.error(error);
      } else {
        if (data && data.length > 0) {
          const user = data[0] as IUser;
          setOtherUser(user);
        }
      }
    };
    fetchUser()
  }, [id])

  useEffect(() => {
    if (otherUser !== null && differenceDistance === 0) {
      //заменить первый аргумент на координаты текущего пользователя(пока они везде одинаковые)
      const diffGeoDistance = coordsToDistance({ latitude: 35.131509, longitude: 9.190496 }, otherUser.geo.coord)
      setDifferenceDistance(diffGeoDistance)
    }
  }, [otherUser])

  const handleOpenBiography = () => {
    setIsBiographyTruncated(false)
  }

  const onGoBackClick = () => {
    navigate(-1)
  }

  //заменить на лоадер
  if (!otherUser) return null

  return (
    <div className={`${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-slate-200 text-zinc-900'} `}>
      <div className={`${theme === 'dark' ? 'bg-zinc-900 text-white' : 'bg-slate-300 text-zinc-900'} py-3 px-3`}>
        <div className='flex items-center gap-x-5 mb-4'>
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

      <div className='py-3 px-3'>
        <div className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : ''}`}>{t('about')} {otherUser.info.nickName}</div>

        <div className='mb-4'>
          {isBiographyTruncated
            ? <div className='mb-2'>{otherUser.profile.biography.slice(0, 150)}...</div>
            : <div className='mb-2'>{otherUser.profile.biography}</div>
          }
          {isBiographyTruncated && (
            <MyButton
              color='black'
              onClick={handleOpenBiography}
              title='more'
            />
          )}
        </div>

        <div className='mb-4 flex flex-col gap-y-2'>
          <div className='flex gap-x-2 items-center'>
            <CakeIcon className={`h-5 w-5 fill-yellow-500`} />
            <div className='text-sm'>{ageToString(otherUser.info.birthDate)}</div>
            <div className='flex gap-x-1 items-center'>
              <ZodiacIcon zodiac={otherUser.info.zodiac} theme={theme} />
              <div>{t(otherUser.info.zodiac)}</div>
            </div>
          </div>

          <div className='flex items-center gap-x-2'>
            {otherUser.info.sex === 'male'
              ? <MaleIcon className={`h-5 w-5 fill-yellow-500`} />
              : otherUser.info.sex === 'female'
                ? <FemaleIcon className={`h-5 w-5 fill-yellow-500`} />
                : <OtherGenderIcon className={`h-5 w-5 fill-yellow-500`} />
            }
            <div>{t('sex')}: {t(otherUser.info.sex)}</div>
          </div>

          <div className='flex items-center gap-x-2'>
            <GeoIcon className={`h-5 w-5 fill-yellow-500`} />
            <div>{otherUser.geo.location.country}</div>
          </div>

          <div className='flex items-center gap-x-2'>
            <ArrowsLeftRightIcon className={`h-5 w-5 fill-yellow-500`} />
            <div>≈ {Math.round(differenceDistance / 100) * 100} {t('kmFromYou')} </div>
          </div>

          <div className='flex items-center gap-x-2'>
            <PlaneIcon className={`h-5 w-5 fill-yellow-500`} />
            <div>{t('letterDelivered')} {deliveredTime < 60 ? `${deliveredTime} ${t('minutes')}` : `${Math.round(deliveredTime / 60)} ${t('hours')}`}
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default OtherProfile