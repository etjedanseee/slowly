import React, { useEffect, useState } from 'react'
import { fetchLocationByCoord, fetchLocationByIp } from '../utils/fetchLocation'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useTranslation } from 'react-i18next'
import GlobusIcon from '../assets/globus.gif'
import MyButton from '../UI/MyButton'
import { ReactComponent as UkraineFlag } from '../assets/ukraineFlag.svg'
import { IUserGeo, IСoordinates } from '../types/Auth/auth'

interface UserGeoProps {
  setUserGeo: (data: IUserGeo | null) => void,
  userGeo: IUserGeo | null,
  setIsUserGeoValid: (bool: boolean) => void
}

const UserGeo = ({ setUserGeo, userGeo, setIsUserGeoValid }: UserGeoProps) => {
  const { theme, lang } = useTypedSelector(state => state.theme)
  const [coord, setCoord] = useState<IСoordinates | null>(null)
  const [ipAddress, setIpAddress] = useState<string | null>(null)

  const { t } = useTranslation()

  const getCurrentCoords = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log(position.coords);
          setCoord({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        error => {
          console.log("Error: ", error)
        }, { enableHighAccuracy: true, maximumAge: 5000 });
    } else {
      console.log('not support')
    }
  }

  const fetchIpAddress = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      setIpAddress(data.ip);
      fetchLocationByIp({ ip: data.ip, setUserGeo, lang: lang })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (coord !== null) {
      fetchLocationByCoord({ coord, setUserGeo })
    }
  }, [coord, setUserGeo])

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
          : <div className='text-center leading-none opacity-80'>{t('deliveryTimeDepens')}</div>
        }
      </div>

      <div className='justify-self-end w-full flex flex-col gap-y-2 mb-2'>
        <MyButton color='yellow' onClick={getCurrentCoords} title='determineGeo' variant='roundedXl' />
        <MyButton color='black' onClick={fetchIpAddress} title='determineIp' variant='roundedXl' />
      </div>
    </div>
  )
}

export default UserGeo