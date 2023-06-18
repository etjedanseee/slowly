import { IUserGeoByCoords, IСoordinates } from "../types/Auth/auth"

interface fetchLocByCoordParams {
  setUserGeo: (data: IUserGeoByCoords) => void,
  coord: IСoordinates,
  setFetchGeoError: (error: string) => void,
  setLoading: (b: boolean) => void
}

export async function fetchLocationByCoord({ coord, setUserGeo, setFetchGeoError, setLoading }: fetchLocByCoordParams) {
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
    setFetchGeoError('Get geo by coords error. Please determine geo by ip')
  } finally {
    setLoading(false)
  }
}