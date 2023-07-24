import React, { useState, useEffect } from 'react'
import { MapContainer, Marker, Polyline, Popup, TileLayer, } from 'react-leaflet'
import { IFriendsWithLetter, ILetter } from '../types/Auth/auth'
import { LatLngLiteral, latLng } from 'leaflet'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useTranslation } from 'react-i18next'
import { ReactComponent as CloseIcon } from '../assets/close.svg'
import { ReactComponent as PlaneIcon } from '../assets/plane.svg'
import { ReactComponent as ArrowDownIcon } from '../assets/arrowDown.svg'
import ChangeMapView from '../components/ChangeMapView'

interface MapProps {
  onWayLetters: ILetter[],
  onClose: () => void,
}

const Map = ({ onWayLetters, onClose }: MapProps) => {
  const { friends, user } = useTypedSelector(state => state.auth)
  const { theme } = useTypedSelector(state => state.theme)
  const { t } = useTranslation()

  const [center, setCenter] = useState<LatLngLiteral>({ lat: 0, lng: 0 })
  const [centerIndex, setCenterIndex] = useState(-1)

  const [friendsWithLetter, setFriendsWithLetter] = useState<IFriendsWithLetter[]>([])

  const gotoPrevFriend = () => {
    if (centerIndex > 0) {
      setCenter(friendsWithLetter[centerIndex - 1].coords)
      setCenterIndex(prev => prev - 1)
    }
  }

  const gotoNextFriend = () => {
    if (centerIndex < friendsWithLetter.length - 1) {
      setCenter(friendsWithLetter[centerIndex + 1].coords)
      setCenterIndex(prev => prev + 1)
    }
  }

  useEffect(() => {
    const resFriendsWithLetter: IFriendsWithLetter[] = []
    for (let friend of friends) {
      const letter = onWayLetters.find(lett => lett.senderId === friend.id)
      if (letter) {
        const friendCoords = latLng({ lat: friend.geo.coord.latitude, lng: friend.geo.coord.longitude })
        resFriendsWithLetter.push({ friend, coords: friendCoords, letter })
      }
    }
    setFriendsWithLetter(resFriendsWithLetter)
  }, [friends, onWayLetters])

  useEffect(() => {
    if (friendsWithLetter.length) {
      setCenter(friendsWithLetter[0].coords)
      setCenterIndex(0)
    }
  }, [friendsWithLetter])

  if (!user) {
    return null
  }

  const uCoords = latLng({ lat: user.geo.coord.latitude, lng: user.geo.coord.longitude })

  return (
    <div className='fixed top-0 left-0 z-50 w-full min-h-screen bg-inherit flex flex-col'>
      <div className='py-4 px-3 flex items-center justify-between'>
        <div>{t('lettersOnWay')}</div>
        <CloseIcon
          className={`${theme === 'dark' ? 'fill-white' : 'fill-black'} h-6 w-6`} onClick={onClose} />
      </div>
      <div className='flex-1 w-full min-h-full h-full relative flex flex-col'>
        <MapContainer
          center={center}
          zoom={6}
          scrollWheelZoom={true}
          className={`w-full flex-1`}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ChangeMapView center={center} />

          {friendsWithLetter.map(fWithLetter => (
            <Marker key={fWithLetter.friend.id} position={fWithLetter.coords}>
              <Popup>
                {fWithLetter.friend.info.nickName}
              </Popup>
            </Marker>
          ))}

          {friendsWithLetter.map(fWithLetter => (
            <Polyline key={fWithLetter.friend.id} positions={[uCoords, fWithLetter.coords]} />
          ))}
        </MapContainer>

        <div
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-x-4 items-center 
          text-white border-4 border-black w-5/6 py-2 px-4 bg-zinc-800 rounded-sm`}
          style={{ zIndex: 999 }}
        >
          <div className='rounded-full'>
            <PlaneIcon className={`fill-white h-12 w-12`} />
          </div>

          <div>{onWayLetters.length} {t('lettersOnWay')}.</div>
          <div
            className='absolute top-1/2 left-0 -translate-x-4 -translate-y-1/2 bg-zinc-900 rounded-full p-1 opacity-90'
            onClick={gotoPrevFriend}
          >
            <ArrowDownIcon className='fill-white h-5 w-5 rotate-90' />
          </div>
          <div
            className='absolute top-1/2 right-0 translate-x-4 -translate-y-1/2 bg-zinc-900 rounded-full p-1 opacity-90'
            onClick={gotoNextFriend}
          >
            <ArrowDownIcon className='fill-white h-5 w-5 -rotate-90' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Map