import { IUserGeoByCoords, IUserGeoByIp, IСoordinates } from "../types/Auth/auth"
import { appLangType } from "../types/Theme/theme"

interface fetchLocByCoordParams {
  setUserGeo: (data: IUserGeoByCoords) => void,
  coord: IСoordinates
}

interface fetchLocByIpParams {
  setUserGeo: (data: IUserGeoByIp) => void,
  ip: string,
  lang: appLangType
}

export async function fetchLocationByCoord({ coord, setUserGeo }: fetchLocByCoordParams) {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coord.latitude}&lon=${coord.longitude}`)
    const data = await response.json()
    console.log({
      coord,
      location: {
        country: data.address.state,
        city: data.address.town
      }
    })
    setUserGeo({
      coord,
      location: {
        country: data.address.state,
        city: data.address.town
      }
    })
  } catch (error) {
    console.log(error)
  }
}

export async function fetchLocationByIp({ ip, setUserGeo, lang }: fetchLocByIpParams) {
  console.log('my ip', ip)
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}?lang=${lang}`);
    const data = await response.json()
    setUserGeo({
      ip,
      location: {
        country: data.country,
        city: data.city
      }
    })
  } catch (error) {
    console.log(error)
  }
}