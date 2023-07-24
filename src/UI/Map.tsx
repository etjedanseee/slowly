import React, { useState, useEffect } from 'react'
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'
import { IFriendsWithCoords, ILetter } from '../types/Auth/auth'
import { latLng } from 'leaflet'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useTranslation } from 'react-i18next'
import { ReactComponent as CloseIcon } from '../assets/close.svg'
import { ReactComponent as PlaneIcon } from '../assets/plane.svg'
import { ReactComponent as ArrowDownIcon } from '../assets/arrowDown.svg'

interface MapProps {
  onWayLetters: ILetter[],
  onClose: () => void
}

const Map = ({ onWayLetters, onClose }: MapProps) => {
  const { friends, user } = useTypedSelector(state => state.auth)
  const { theme } = useTypedSelector(state => state.theme)
  const { t } = useTranslation()

  const [friendsWithCoords, setFriendsWithCoords] = useState<IFriendsWithCoords[]>([])

  useEffect(() => {
    const resFriendsWithCoords: IFriendsWithCoords[] = []
    for (let letter of onWayLetters) {
      const sender = friends.find(f => f.id === letter.senderId)
      if (sender) {
        const friendCoords = latLng({ lat: sender.geo.coord.latitude, lng: sender.geo.coord.longitude })
        resFriendsWithCoords.push({ friend: sender, coords: friendCoords })
      }
    }
    setFriendsWithCoords(resFriendsWithCoords)
  }, [friends, onWayLetters])

  if (!user) {
    return null
  }

  const uCoords = latLng({ lat: user.geo.coord.latitude, lng: user.geo.coord.longitude })
  // const polyline = [uCoords, othUCoords]
  return (
    <div className='fixed top-0 left-0 z-50 w-full min-h-screen bg-inherit flex flex-col'>
      <div className='py-4 px-3 flex items-center justify-between'>
        <div>{t('lettersOnWay')}</div>
        <CloseIcon
          className={`${theme === 'dark' ? 'fill-white' : 'fill-black'} h-6 w-6`} onClick={onClose} />
      </div>
      <div className='flex-1 w-full min-h-full h-full relative flex flex-col'>
        <MapContainer
          center={uCoords}
          zoom={6}
          scrollWheelZoom={false}
          className={`w-full flex-1`}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* <Polyline positions={polyline} /> */}

          {friendsWithCoords.map(fWithCoords => (
            <Marker key={fWithCoords.friend.id} position={fWithCoords.coords}>
              <Popup>
                {fWithCoords.friend.info.nickName}
              </Popup>
            </Marker>
          ))}

          {friendsWithCoords.map(fWithCoords => (
            <Polyline key={fWithCoords.friend.id} positions={[uCoords, fWithCoords.coords]} />
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
          <div className='absolute top-1/2 left-0 -translate-x-4 -translate-y-1/2 bg-zinc-900 rounded-full p-1 opacity-90'>
            <ArrowDownIcon className='fill-white h-5 w-5 rotate-90' />
          </div>
          <div className='absolute top-1/2 right-0 translate-x-4 -translate-y-1/2 bg-zinc-900 rounded-full p-1 opacity-90'>
            <ArrowDownIcon className='fill-white h-5 w-5 -rotate-90' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Map