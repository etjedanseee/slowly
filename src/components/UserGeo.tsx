import React, { useEffect, useState } from 'react'
import { fetchLocationByCoord } from '../utils/fetchLocation'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useTranslation } from 'react-i18next'
import GlobusIcon from '../assets/globus.gif'
import MyButton from '../UI/MyButton'
import { ReactComponent as UkraineFlag } from '../assets/ukraineFlag.svg'
import { IUserGeo } from '../types/Auth/auth'
import Loader from '../UI/Loader'

interface UserGeoProps {
  setUserGeo: (data: IUserGeo | null) => void,
  userGeo: IUserGeo | null,
  setIsUserGeoValid: (bool: boolean) => void
}

const UserGeo = ({ setUserGeo, userGeo, setIsUserGeoValid }: UserGeoProps) => {
  const { theme } = useTypedSelector(state => state.theme)
  const { t } = useTranslation()
  const [fetchGeoError, setFetchGeoError] = useState('')
  const [loading, setLoading] = useState(false)

  const onGetCoordsByGeo = () => {
    setFetchGeoError('')
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => fetchLocationByCoord({ coord: position.coords, setUserGeo, setFetchGeoError, setLoading }),
        error => {
          console.log("get geo error:", error)
          setFetchGeoError(`${error.message} \n Please determine geo by ip`)
        },
        { enableHighAccuracy: true, maximumAge: 5000 }
      );
    } else {
      setFetchGeoError('Browser not support. Please determine geo by ip')
    }
  }

  const onFetchByIpAddress = async () => {
    setFetchGeoError('')
    setLoading(true)
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      setUserGeo({
        coord: {
          latitude: data.latitude,
          longitude: data.longitude
        },
        location: {
          city: data.city,
          country: data.country_name
        }
      })
    } catch (error) {
      console.error('fetch coords by ip error', error);
      setFetchGeoError('Get geolocation by ip error')
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (userGeo) {
      setIsUserGeoValid(true)
    } else {
      setIsUserGeoValid(false)
    }
  }, [userGeo])

  return (
    <div className={`${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-900'} 
      px-2 flex flex-col items-center justify-between pt-20 h-screen absolute top-0 z-10 w-full`}>
      <img src={GlobusIcon} className='h-32 mt-10' alt="" />
      <div className='w-full flex flex-col items-center'>
        <div className='text-4xl mb-3 font-medium'>{t('Where are you?')}</div>
        {userGeo ? (
          <>{
            userGeo.location.country === 'Россия' || userGeo.location.country === 'Russia'
              ? <div className='text-center'>{t('condolences')} {userGeo.location.country}</div>
              : <div className='text-center'>
                {userGeo.location.country === 'Україна' || userGeo.location.country === 'Ukraine'
                  ? <div className='flex items-center gap-x-2'>
                    <div>{t('helloUkraine')}</div>
                    <UkraineFlag className='h-6' />
                  </div>
                  : <div>{t('hello')}, {userGeo.location.country} {userGeo.location.city}!</div>
                }</div>
          }</>
        )
          : (
            <>
              <div className='text-center leading-none opacity-80 mb-2'>{t('deliveryTimeDepens')}</div>
              {fetchGeoError && <div className='text-red-500 font-medium text-center'>{fetchGeoError}</div>}
            </>
          )
        }
      </div>

      {loading
        ? <div className='flex justify-center py-20'><Loader size='12' /></div>
        : (
          <div className='justify-self-end w-full flex flex-col gap-y-2 mb-2'>
            <MyButton color='yellow' onClick={onGetCoordsByGeo} title='determineGeo' />
            <MyButton color='black' onClick={onFetchByIpAddress} title='determineIp' />
          </div>
        )
      }
    </div>
  )
}

export default UserGeo