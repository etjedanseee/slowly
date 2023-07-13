import { IUserGeoByCoords, IСoordinates } from "../types/Auth/auth"
import { toast } from 'react-toastify'

interface fetchLocByCoordParams {
  setUserGeo: (data: IUserGeoByCoords) => void,
  coord: IСoordinates,
  setLoading: (b: boolean) => void,
  t: (s: string) => string
}

export async function fetchLocationByCoord({ coord, setUserGeo, setLoading, t }: fetchLocByCoordParams) {
  setLoading(true)
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coord.latitude}&lon=${coord.longitude}`)
    const data = await response.json()

    setUserGeo({
      coord: {
        latitude: coord.latitude,
        longitude: coord.longitude
      },
      location: {
        country: data.address.state,
        city: data.address.town
      }
    })
  } catch (error) {
    console.log('fetch coords by geo error')
    toast.error(t('getGeoByCoordsError'))
  } finally {
    setLoading(false)
  }
}