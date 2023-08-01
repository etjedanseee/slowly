import { LatLngLiteral } from 'leaflet'
import { ILetter } from '../types/Auth/auth'

export const calcWhereNowOnWayLetter = (coords1: LatLngLiteral, coords2: LatLngLiteral, letter: ILetter): LatLngLiteral | null => {
  const sendDate = new Date(letter.createdAt)
  const deliveredDate = new Date(letter.deliveredDate)
  const diffTime = +deliveredDate - +sendDate
  if (diffTime <= 0) {
    return null
  }
  const passedTime = Date.now() - +sendDate
  const ratioOfCurrTimeToTotalDeliveryTime = passedTime / diffTime
  const currentLetterLatitude = coords1.lat + ratioOfCurrTimeToTotalDeliveryTime * (coords2.lat - coords1.lat)
  const currentLetterLongitude = coords1.lng + ratioOfCurrTimeToTotalDeliveryTime * (coords2.lng - coords1.lng)

  return {
    lat: currentLetterLatitude,
    lng: currentLetterLongitude
  }
}