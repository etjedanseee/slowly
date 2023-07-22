import React, { useState, useEffect } from 'react'
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'
import { ILetter } from '../types/Auth/auth'
import { LatLng, latLng } from 'leaflet'
import { useTypedSelector } from '../hooks/useTypedSelector'

interface MapProps {
  recentlyLetters: ILetter[],
}

const Map = ({ recentlyLetters }: MapProps) => {
  const { friends, user } = useTypedSelector(state => state.auth)

  const [friendsCoords, setFriendsCoords] = useState<LatLng[]>([])

  useEffect(() => {
    const resCoords: LatLng[] = []
    for (let friend of friends) {
      const friendCoords = latLng({ lat: friend.geo.coord.latitude, lng: friend.geo.coord.longitude })
      resCoords.push(friendCoords)
    }
    setFriendsCoords(resCoords)
  }, [friends])

  if (!user) {
    return null
  }

  const uCoords = latLng({ lat: user.geo.coord.latitude, lng: user.geo.coord.longitude })
  // const polyline = [uCoords, othUCoords]
  return (
    <div className='w-full px-2 relative'>
      <MapContainer
        center={uCoords}
        zoom={5}
        scrollWheelZoom={false}
        className='w-full h-60'
      // style={{ height: 280, width: 280 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* <Polyline positions={polyline} /> */}

        {friendsCoords.map((fCoords, index) => (
          <Marker position={fCoords}>
            <Popup>
              {friends[index].info.nickName}
            </Popup>
          </Marker>
        ))}

        {/* <Marker position={uCoords}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
      </MapContainer>

      <div className='absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-x-4 items-center text-black' style={{ zIndex: 999 }}>
        <div>left</div>
        <div>right</div>
      </div>
    </div>
  )
}

export default Map